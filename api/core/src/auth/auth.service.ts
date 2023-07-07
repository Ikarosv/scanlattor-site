import { UserService } from 'src/user/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado!');
    }

    if (!(await compare(password, user.password))) {
      throw new UnauthorizedException('Senha incorreta!');
    }

    const { password: _pass, ...userWithoutPassword } = user;

    const payload = {
      sub: user.id,
      username: user.name,
      user: userWithoutPassword,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
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

    const { password: _password, ...createdUserWithoutPassword } = createdUser;

    const payload = {
      sub: createdUserWithoutPassword.id,
      username: createdUserWithoutPassword.name,
      user: createdUserWithoutPassword,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
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
