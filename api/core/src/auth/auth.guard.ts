import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { Role } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

type ResultToken = {
  sub: number;
  username: string;
  user: {
    id: number;
    name: string;
    email: string;
    createdAt: string;
    role: Role;
  };
  iat: number;
  exp: number;
};

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Usuário não autorizado!');
    }

    try {
      const payload = await this.jwtService.verifyAsync<ResultToken>(token, {
        secret: process.env.JWT_SECRET,
      });

      const userDb = (await this.prisma.user.findUnique({
        where: {
          id: payload.user.id,
        },
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
          role: true,
        },
      })) as unknown as ResultToken['user'];

      userDb.createdAt = new Date(userDb.createdAt).toISOString();

      if (!userDb) {
        throw new UnauthorizedException('Usuário não autorizado!');
      }

      if (userDb.role !== payload.user.role) {
        payload.user.role = userDb.role;
      }

      if (JSON.stringify(userDb) !== JSON.stringify(payload.user)) {
        throw new UnauthorizedException('Usuário não autorizado!');
      }

      request['user'] = payload.user;
    } catch {
      throw new UnauthorizedException('Usuário não autorizado!');
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
