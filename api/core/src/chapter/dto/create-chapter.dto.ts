import { IsDateString, IsString, IsNumber, IsOptional } from 'class-validator';
import { Prisma } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateChapterDto
  implements Prisma.ChapterUncheckedCreateWithoutMangaInput
{
  @ApiProperty()
  @IsString()
  content: string;
  
  @ApiProperty()
  @IsString()
  @IsOptional()
  title: string;
  
  @ApiProperty()
  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
    maxDecimalPlaces: 2,
  })
  number: number;
  
  @ApiProperty()
  @IsOptional()
  @IsString()
  mangaId?: string;
  
  @ApiProperty()
  @IsOptional()
  @IsDateString()
  createdAt: Date;
  
  @ApiProperty()
  @IsOptional()
  @IsDateString()
  updatedAt: Date;
  
  @ApiProperty()
  @IsOptional()
  @IsString()
  createdById: string;
}
