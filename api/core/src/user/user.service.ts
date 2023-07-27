import { PrismaService } from '../prisma/prisma.service';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  public querySelectWithoutPassword = {
    id: true,
    name: true,
    email: true,
    role: true,
    createdAt: true,
    password: false,
  };

  async userExists(id: string) {
    const user = await this.prisma.user.count({
      where: {
        id,
      },
    });

    if (!user) {
      throw new HttpException(
        `Usuário ${id} não existe`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async encryptPassword(password: string) {
    return hash(password, 10);
  }

  async create({ email, name, password }: CreateUserDto) {
    const user = await this.prisma.user.findFirst({
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
        password: await this.encryptPassword(password),
      },
      select: this.querySelectWithoutPassword,
    });
    // This will return the newly created user
  }

  async findAll() {
    return this.prisma.user.findMany({
      select: this.querySelectWithoutPassword,
    }); // This will return all the users
  }

  async findOne(id: string) {
    await this.userExists(id);

    return this.prisma.user.findUnique({
      where: {
        id,
      },
      select: this.querySelectWithoutPassword,
    }); // This will return the user with the id passed in the url
  }

  async update(id: string, data: UpdateUserDto) {
    await this.userExists(id);

    return this.prisma.user.update({
      where: {
        id,
      },
      data,
      select: this.querySelectWithoutPassword,
    });
  }

  async remove(id: string) {
    await this.userExists(id);

    return this.prisma.user.delete({
      where: {
        id,
      },
      select: this.querySelectWithoutPassword,
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
}
