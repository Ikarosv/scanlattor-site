import { CreateMangaDto } from './dto/create-manga.dto';
import { UpdateMangaDto } from './dto/update-manga.dto';
import { MangaService } from './manga.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Public } from '../decorators/public.decorator';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Mangas')
@Controller('mangas')
export class MangaController {
  constructor(private readonly mangaService: MangaService) {}

  @ApiOperation({
    summary: 'Cria um novo manga',
    description: 'Rota POST que retorna um manga',
  })
  @ApiBearerAuth('')
  @Post()
  async create(@Body() newManga: CreateMangaDto) {
    return this.mangaService.create(newManga); // This will return the newly created manga
  }

  @Public()
  @Get()
  async findAll(
    @Query('page') page?: number,
    @Query('search') search?: string,
  ) {
    return this.mangaService.findAll({ page, search }); // This will return all the mangas
  }

  @Public()
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.mangaService.findOne(id); // This will return the manga with the id passed in the url
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() newManga: UpdateMangaDto,
  ) {
    return this.mangaService.update(id, newManga); // This will update the manga with the id passed in the url
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.mangaService.remove(id); // This will remove the manga with the id passed in the url
  }

  @Public()
  @Get('most-read')
  async findMostRead() {
    return this.mangaService.findMostRead();
  }
}
