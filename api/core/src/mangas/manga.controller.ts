import { CreateMangaDto } from './dto/create-manga.dto';
import { UpdateMangaDto } from './dto/update-manga.dto';
import { MangaService } from './manga.service';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Public } from '../decorators/public.decorator';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CheckPolicies } from 'src/decorators/checkPolicies.decorator';
import CanCreateMangaPolicyHandler from 'src/policiesHandler/mangas/CanCreateManga.policy';
import CanUpdateMangaPolicyHandler from 'src/policiesHandler/mangas/CanUpdateManga.policy.handler';
import CanDeleteMangaPolicyHandler from 'src/policiesHandler/mangas/CanDeleteManga.policy';

@ApiTags('Mangas')
@Controller('mangas')
export class MangaController {
  constructor(private readonly mangaService: MangaService) {}

  @ApiOperation({
    summary: 'Cria um novo manga',
    description: 'Rota POST que retorna um manga',
  })
  @ApiBearerAuth('Mod ou Admin')
  @CheckPolicies(new CanCreateMangaPolicyHandler())
  @Post()
  async create(@Body() newManga: CreateMangaDto) {
    return this.mangaService.create(newManga); // This will return the newly created manga
  }

  @ApiOperation({
    summary: 'Pega os mangás',
    description: 'Rota GET que retorna os mangás por página e/ou pesquisa',
  })
  @Public()
  @Get()
  async findAll(
    @Query('page') page?: number,
    @Query('search') search?: string,
  ) {
    return this.mangaService.findAll({ page, search }); // This will return all the mangas
  }

  @ApiOperation({
    summary: 'Pega os mangás mais lidos',
    description: 'Rota GET que retorna os mangás mais lidos',
  })
  @Public()
  @Get('most-read')
  async findMostRead(@Query('page') pageQuery?: string) {
    const page = pageQuery;
    if (page && +page < 1) {
      throw new BadRequestException('Página deve ser maior que 0');
    }
    return this.mangaService.findMostRead(Number(page));
  }

  @ApiOperation({
    summary: 'Pega um mangá pelo id',
    description: 'Rota GET que retorna um mangás pelo id que vem pela URL',
  })
  @Public()
  @Get('get/:id')
  async findOne(@Param('id') id: string) {
    return this.mangaService.findOne(id); // This will return the manga with the id passed in the url
  }

  @ApiOperation({
    summary: 'Atualiza um mangá pelo id',
    description: 'Rota PUT que retorna o mangá atualizado',
  })
  @Put(':id')
  @CheckPolicies(new CanUpdateMangaPolicyHandler())
  async update(@Param('id') id: string, @Body() newManga: UpdateMangaDto) {
    return this.mangaService.update(id, newManga); // This will update the manga with the id passed in the url
  }

  @ApiOperation({
    summary: 'Deleta um mangá pelo id',
    description: 'Rota DELETE que retorna o mangá deletado',
  })
  @Delete(':id')
  @CheckPolicies(new CanDeleteMangaPolicyHandler())
  async remove(@Param('id') id: string) {
    return this.mangaService.remove(id); // This will remove the manga with the id passed in the url
  }
}
