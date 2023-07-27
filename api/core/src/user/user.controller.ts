import {
  Body,
  Delete,
  Get,
  Param,
  // Post,
  Put,
  Controller,
  // ParseIntPipe,
} from '@nestjs/common';
// import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CheckPolicies } from 'src/decorators/checkPolicies.decorator';
import CanUpdateUserPolicyHandler from 'src/policiesHandler/users/CanUpdateUser.policy';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import CanManageUserPolicyHandler from 'src/policiesHandler/users/CanManageUser.policy';
import CanReadUserPolicyHandler from 'src/policiesHandler/users/CanReadUser.policy';
import CanDeleteUserPolicyHandler from 'src/policiesHandler/users/CanDeleteUser.policy';

@ApiTags('Usuários')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Cadastrar um novo usuário
  // @Post()
  // async create(@Body() newUser: CreateUserDto) {
  //   return this.userService.create(newUser); // This will return the newly created user
  // }

  // Listar todos os usuários
  @ApiOperation({
    summary: 'Pega os usuários',
    description: 'Rota GET que retorna os usuários',
  })
  @ApiBearerAuth('Admin')
  @CheckPolicies(new CanManageUserPolicyHandler())
  @Get()
  async findAll() {
    return this.userService.findAll(); // This will return all the users
  }

  // Listar um usuário específico
  @ApiOperation({
    summary: 'Pega um usuário pelo id',
    description: 'Rota GET que retorna um usuário pelo id que vem pela URL',
  })
  @ApiBearerAuth('Admin ou o próprio usuário')
  @CheckPolicies(new CanReadUserPolicyHandler())
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(id); // This will return the user with the id passed in the url
  }

  // Atualizar um usuário
  @ApiOperation({
    summary: 'Atualiza um usuário',
    description: 'Rota PUT que retorna um usuário atualizado',
  })
  @ApiBearerAuth('Admin ou o próprio usuário')
  @CheckPolicies(new CanUpdateUserPolicyHandler())
  @Put(':id')
  async update(@Param('id') id: string, @Body() newUser: UpdateUserDto) {
    return this.userService.update(id, newUser); // This will update the user with the id passed in the url
  }

  // Deletar um usuário
  @ApiOperation({
    summary: 'Deleta um usuário',
    description: 'Rota DELETE que retorna um usuário deletado',
  })
  @ApiBearerAuth('Admin ou o próprio usuário')
  @CheckPolicies(new CanDeleteUserPolicyHandler())
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.userService.remove(id); // This will remove the user with the id passed in the url
  }
}
