import {
  Body,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Controller,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Cadastrar um novo usuário
  @Post()
  async create(@Body() newUser: CreateUserDto) {
    return this.userService.create(newUser); // This will return the newly created user
  }

  // Listar todos os usuários
  @Get()
  async findAll() {
    return this.userService.findAll(); // This will return all the users
  }

  // Listar um usuário específico
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id); // This will return the user with the id passed in the url
  }

  // Atualizar um usuário
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() newUser: UpdateUserDto,
  ) {
    return this.userService.update(id, newUser); // This will update the user with the id passed in the url
  }

  // Deletar um usuário
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id); // This will remove the user with the id passed in the url
  }
}
