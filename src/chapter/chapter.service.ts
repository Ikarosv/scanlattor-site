import {
  HttpException,
  HttpStatus,
  Injectable,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';
import '../cloudinary/config';

@Injectable()
export class ChapterService {
  constructor(private prisma: PrismaService) {}

  async findBySlug(slug: string) {
    const manga = await this.prisma.manga.findFirst({
      where: {
        slug,
      },
    });

    if (!manga) {
      throw new HttpException('Mangá inexistente', HttpStatus.BAD_REQUEST);
    }

    return manga;
  }

  async create(data: CreateChapterDto, slug: string) {
    const { number } = data;
    let mangaId = data.mangaId;
    if (!data.mangaId) {
      mangaId = (await this.findBySlug(slug)).id;
    }

    const chapterExists = await this.prisma.chapter.findFirst({
      where: {
        number,
        mangaId,
      },
    });

    if (chapterExists) {
      throw new HttpException('Capítulo já existe', HttpStatus.CONFLICT);
    }

    const chapter = await this.prisma.chapter.create({
      data: {
        ...data,
        mangaId,
      },
    });

    return chapter;
  }

  async findAll() {
    return this.prisma.chapter.findMany();
  }

  async findOne(@Param('id', ParseIntPipe) id: number) {
    const chapter = await this.prisma.chapter.findUnique({
      where: {
        id,
      },
      include: {
        manga: true,
      },
    });

    if (!chapter) {
      throw new HttpException('Capítulo não existe', HttpStatus.BAD_REQUEST);
    }

    return chapter;
  }

  async findByNumber(
    @Param('number', ParseIntPipe) number: number,
    @Param('slug') slug: string,
  ) {
    const chapter = await this.prisma.chapter.findFirst({
      where: {
        number,
        manga: {
          slug,
        },
      },
    });

    if (!chapter) {
      throw new HttpException('Capítulo não existe!', HttpStatus.BAD_REQUEST);
    }

    return chapter;
  }

  async update(
    @Param('number', ParseIntPipe) numb: number,
    data: UpdateChapterDto,
    @Param('slug') slug: string,
  ) {
    const chapter = await this.prisma.chapter.findFirst({
      where: {
        number: numb,
        manga: {
          slug,
        },
      },
    });

    if (!chapter) {
      throw new HttpException('Capítulo não existe!', HttpStatus.BAD_REQUEST);
    }

    return this.prisma.chapter.update({
      where: {
        id: chapter.id,
      },
      data,
    });
  }

  async remove(@Param('id', ParseIntPipe) id: number) {
    const chapter = await this.prisma.chapter.findUnique({
      where: {
        id,
      },
    });

    if (!chapter) {
      throw new HttpException('Capítulo não existe', HttpStatus.BAD_REQUEST);
    }

    return this.prisma.chapter.delete({
      where: {
        id,
      },
    });
  }
}
