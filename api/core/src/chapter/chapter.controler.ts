import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ChapterService } from './chapter.service';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';
import { Public } from '../decorators/public.decorator';
import { CheckPolicies } from 'src/decorators/checkPolicies.decorator';
import CreateChapterPolicyHandler from 'src/policiesHandler/chapter/CreateChapter.policy';

@Controller(':slug')
export class ChapterController {
  constructor(private readonly chapterService: ChapterService) {}

  @Post('chapter')
  // @CheckPolicies(new CreateChapterPolicyHandler())
  async create(
    @Body() newChapter: CreateChapterDto,
    @Param('slug') slug: string,
  ) {
    return this.chapterService.create(newChapter, slug); // This will return the newly created manga
  }

  @Public()
  @Get()
  async findAll() {
    return this.chapterService.findAll(); // This will return all the mangas
  }

  @Public()
  @Get(':number')
  async findOne(
    @Param('number', ParseIntPipe) number: number,
    @Param('slug') slug: string,
  ) {
    return this.chapterService.findByNumber(number, slug); // This will return the manga with the id passed in the url
  }

  @Put(':number')
  async update(
    @Param('number', ParseIntPipe) numb: number,
    @Body() newChapter: UpdateChapterDto,
    @Param('slug') slug: string,
  ) {
    return this.chapterService.update(numb, newChapter, slug); // This will update the manga with the id passed in the url
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.chapterService.remove(id); // This will remove the manga with the id passed in the url
  }
}
