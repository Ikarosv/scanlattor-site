import {
  Injectable,
  Param,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMangaDto } from './dto/create-manga.dto';
import { Prisma } from '@prisma/client';
import { UpdateMangaDto } from './dto/update-manga.dto';
// import { v2 as cloudinary } from 'cloudinary';
// import '../cloudinary/config';

@Injectable()
export class MangaService {
  constructor(private prisma: PrismaService) {}

  async findOne(@Param('id') id: string) {
    const manga = await this.prisma.manga.findUnique({
      where: {
        id,
      },
    });

    if (!manga) {
      throw new BadRequestException('Mangá não existe');
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

    // cloudinary.search.expression('thumbs').execute();

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

    const [total, mangas] = await this.prisma.$transaction([
      this.prisma.manga.count({ where: query.where }),
      this.prisma.manga.findMany(query),
    ]);

    return { total, mangas };
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
      throw new ConflictException('Manga já existe');
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

  async update(@Param('id') id: string, data: UpdateMangaDto) {
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

  async remove(@Param('id') id: string) {
    await this.findOne(id);
    return this.prisma.manga.delete({
      where: {
        id,
      },
    });
  }

  async findMostRead(page: number = 1) {
    const take = 5
    const mangas = await this.prisma.manga.findMany({
      orderBy: {
        views: 'desc',
      },
      take,
      skip: take * page -1,
    });

    return mangas;
  }
}
