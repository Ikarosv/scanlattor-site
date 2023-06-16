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

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() newUser: CreateUserDto) {
    return this.userService.create(newUser); // This will return the newly created user
  }

  @Get()
  async findAll() {
    return this.userService.findAll(); // This will return all the users
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id); // This will return the user with the id passed in the url
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() newUser: CreateUserDto,
  ) {
    return this.userService.update(id, newUser); // This will update the user with the id passed in the url
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id); // This will remove the user with the id passed in the url
  }
}
