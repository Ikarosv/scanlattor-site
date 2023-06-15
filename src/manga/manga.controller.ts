import { CreateMangaDto } from './dto/create-manga.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

@Controller('mangas')
export class MangaController {
  @Post()
  async create(@Body() newManga: CreateMangaDto) {
    return { newManga }; // This will return the newly created manga
  }

  @Get()
  async findAll() {
    return { mangas: [] }; // This will return all the mangas
  }

  @Get(':id')
  async findOne(@Param() { id }: { id: string }) {
    return { manga: { id } }; // This will return the manga with the id passed in the url
  }

  @Put(':id')
  async update() {
    return 'This action updates a manga';
  }

  @Delete(':id')
  async remove() {
    return 'This action removes a manga';
  }
}
