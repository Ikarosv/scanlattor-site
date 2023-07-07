import {
  Body,
  Controller,
  NotImplementedException,
  Post,
} from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { Public } from '../decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() user: LoginUserDto) {
    return this.authService.login(user.email, user.password); // This will return the token
  }

  @Public()
  @Post('register')
  async register(@Body() user: CreateUserDto) {
    return this.authService.register(user.email, user.name, user.password); // This will return the token
  }

  @Public()
  @Post('forget')
  async forget(@Body() user: LoginUserDto['email']) {
    throw new NotImplementedException({ message: 'Ainda não implementado!' });
    // return this.authService.forget(user.email); // This will return the token
  }
}
