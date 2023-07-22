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
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import AccessToken from './entities/AcessToken.entity';
import Errors from './entities/Errors.entity';

@ApiTags('Authenticathor')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @ApiOperation({
    summary: 'Login do User',
    description: 'Rota POST que retorna um "acess_token"',
  })
  @ApiBody({ type: LoginUserDto })
  @ApiOkResponse({
    status: 200,
    description: 'Login realizado com sucesso!',
    type: AccessToken,
  })
  @ApiResponse({
    status: 401,
    description: 'Email não encontrado! ou Senha incorreta!',
    type: Errors,
  })
  @Post('login')
  async login(@Body() user: LoginUserDto): Promise<AccessToken> {
    return this.authService.login(user.email, user.password); // This will return the token
  }

  @Public()
  @ApiOperation({
    summary: 'Cadastro do User',
    description: 'Rota POST que retorna um "acess_token"',
  })
  @ApiBody({ type: CreateUserDto })
  @ApiOkResponse({
    status: 200,
    description: 'Cadastro realizado com sucesso!',
    type: AccessToken,
  })
  @ApiResponse({
    status: 401,
    description: 'Usuário já existe!',
    type: Errors,
  })
  @Post('register')
  async register(@Body() user: CreateUserDto): Promise<AccessToken> {
    return this.authService.register(user.email, user.name, user.password); // This will return the token
  }

  @Public()
  @ApiOperation({
    summary: 'Esqueci minha senha',
    description: 'Rota ainda não iplementada!',
  })
  @ApiResponse({
    status: 501,
    description: 'Ainda não implementado!',
  })
  @Post('forget')
  async forget(@Body() user: LoginUserDto['email']) {
    // return this.authService.forget(user.email); // This will return the token
    throw new NotImplementedException({ message: 'Ainda não implementado!' });
  }
}
