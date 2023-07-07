import { IsDateString, IsString, IsNumber, IsOptional } from 'class-validator';
import { Prisma } from '@prisma/client';

export class CreateChapterDto implements Prisma.ChapterCreateWithoutMangaInput {
  @IsString()
  content: string;

  @IsString()
  @IsOptional()
  title: string;

  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
    maxDecimalPlaces: 2,
  })
  number: number;

  @IsNumber()
  @IsOptional()
  mangaId?: number;

  @IsOptional()
  @IsDateString()
  createdAt: Date;

  @IsOptional()
  @IsDateString()
  updatedAt: Date;
}
