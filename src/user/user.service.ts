import { PrismaService } from '../prisma/prisma.service';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create({ email, name, password }: CreateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (user) {
      throw new HttpException('Usuário já existe', HttpStatus.BAD_REQUEST);
    }
    return this.prisma.user.create({
      data: {
        email,
        name,
        password,
      },
    });
    // This will return the newly created user
  }

  async findAll() {
    return this.prisma.user.findMany(); // This will return all the users
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new HttpException('Usuário não existe', HttpStatus.BAD_REQUEST);
    }

    return this.prisma.user.findUnique({
      where: {
        id,
      },
    }); // This will return the user with the id passed in the url
  }

  async update(id: number, data: CreateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new HttpException('Usuário não existe', HttpStatus.BAD_REQUEST);
    }

    return this.prisma.user.update({
      where: {
        id,
      },
      data,
    });
  }

  async remove(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new HttpException('Usuário não existe', HttpStatus.BAD_REQUEST);
    }

    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
