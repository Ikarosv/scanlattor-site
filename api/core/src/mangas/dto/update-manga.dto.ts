import { PartialType } from '@nestjs/mapped-types';
import { CreateMangaDto } from './create-manga.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMangaDto extends PartialType(CreateMangaDto) {
  @ApiProperty({ required: true })
  id: string;
}
