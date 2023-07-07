import {
  HttpStatus,
  HttpException,
  Injectable,
  Param,
  ParseIntPipe,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMangaDto } from './dto/create-manga.dto';
import { Prisma } from '@prisma/client';
import { UpdateMangaDto } from './dto/update-manga.dto';

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

  async findAll({ page, search }: findAll.props) {
    if (page && page < 1)
      throw new BadRequestException('Página deve ser maior que 0');

    const query: Prisma.MangaFindManyArgs = {
      include: {
        chapters: {
          orderBy: {
            number: 'desc',
          },
          take: 5,
        },
      },
    };

    if (page) {
      query.skip = (page - 1) * 10;
      query.take = 20;
    }

    if (search) {
      query.where = {
        OR: [
          {
            title: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            synopsis: {
              contains: search,
              mode: 'insensitive',
            },
          },
        ],
      };
    }

    return this.prisma.manga.findMany(query);
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

  async update(@Param('id', ParseIntPipe) id: number, data: UpdateMangaDto) {
    await this.findOne(id);
    const query: Prisma.MangaUpdateArgs = {
      where: {
        id,
      },
      data: {
        ...data,
        releaseDate: undefined,
        gender: undefined,
      },
    };

    if (data.releaseDate) {
      query.data.releaseDate = new Date(data.releaseDate).toISOString();
    }

    if (data.gender) {
      query.data.gender = {
        connect: data.gender,
      };
    }

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
