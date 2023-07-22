import { UserService } from 'src/user/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async createToken(user: User) {
    const { password: _pass, ...userWithoutPassword } = user;

    const payload = {
      sub: userWithoutPassword.id,
      username: userWithoutPassword.name,
      user: userWithoutPassword,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async login(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Email não encontrado!');
    }

    if (!(await compare(password, user.password))) {
      throw new UnauthorizedException('Senha incorreta!');
    }

    return this.createToken(user);
  }

  async register(email: string, name: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (user) {
      throw new UnauthorizedException('Usuário já existe!');
    }

    const createdUser = await this.userService.create({
      email,
      name,
      password,
    });

    return this.createToken(createdUser);
  }

  async forget(email: string) {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado!');
    }

    return 'oi';
    // this.userService.update(0);
  }
}
