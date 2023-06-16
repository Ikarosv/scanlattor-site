import {
  HttpStatus,
  HttpException,
  Injectable,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMangaDto } from './dto/create-manga.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class MangaService {
  constructor(private prisma: PrismaService) {}

  async findOne(@Param('id', ParseIntPipe) id: number) {
    const manga = await this.prisma.manga.findUnique({
      where: {
        id,
      },
    });

    if (!manga) {
      throw new HttpException('Mangá não existe', HttpStatus.BAD_REQUEST);
    }

    return manga;
  }

  async findAll() {
    return this.prisma.manga.findMany();
  }

  async create(data: CreateMangaDto) {
    const { title, author } = data;
    const mangaExists = await this.prisma.manga.findFirst({
      where: {
        title,
        author,
      },
    });

    if (mangaExists) {
      throw new HttpException('Manga já existe', HttpStatus.CONFLICT);
    }

    const manga = await this.prisma.manga.create({
      data: {
        ...data,
        releaseDate: new Date(data.releaseDate).toISOString(),
        gender: {
          connect: data.gender,
        },
      },
    });

    return manga;
  }

  async update(@Param('id', ParseIntPipe) id: number, data: CreateMangaDto) {
    await this.findOne(id);
    const query: Prisma.MangaUpdateArgs = {
      where: {
        id,
      },
      data: {
        ...data,
        releaseDate: new Date(data.releaseDate).toISOString() ?? undefined,
        gender: data.gender
          ? {
              connect: data.gender,
            }
          : undefined,
      },
    };

    return this.prisma.manga.update(query);
  }

  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.findOne(id);
    return this.prisma.manga.delete({
      where: {
        id,
      },
    });
  }
}
