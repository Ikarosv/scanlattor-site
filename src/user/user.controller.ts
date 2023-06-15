import {
  Body,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Controller,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() newUser: CreateUserDto) {
    return this.userService.create(newUser); // This will return the newly created user
  }

  @Get()
  async findAll() {
    return { users: [] }; // This will return all the users
  }
  @Get(':id')
  async findOne(@Param() { id }: { id: string }) {
    return { user: { id } }; // This will return the user with the id passed in the url
  }
  @Put(':id')
  async update() {
    return 'This action updates a user';
  }
  @Delete(':id')
  async remove() {
    return 'This action removes a user';
  }
}
