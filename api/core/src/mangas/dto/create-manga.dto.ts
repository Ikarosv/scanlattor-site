import { ApiProperty } from '@nestjs/swagger';
import { Prisma, Status } from '@prisma/client';

import {
  IsDateString,
  IsString,
  MinLength,
  IsOptional,
  IsUrl,
  IsObject,
  IsEnum,
} from 'class-validator';

export class CreateMangaDto implements Prisma.MangaCreateManyInput {
  @ApiProperty({ required: true })
  @IsString({
    message: 'O título precisa ser uma string',
  })
  @MinLength(2, {
    message: 'O título precisa ter no mínimo 2 caracteres',
  })
  title: string;

  @ApiProperty({ required: true })
  @IsDateString({}, { message: 'Data inválida' })
  releaseDate: Date;

  @ApiProperty({ required: false })
  @IsString()
  @MinLength(2, {
    message: 'Autor precisa ter no mínimo 2 caracteres',
  })
  @IsOptional()
  author?: string;

  @ApiProperty({ required: true })
  @IsEnum(Status)
  status: Status;

  @ApiProperty({ required: true })
  @IsString()
  slug: string;

  @ApiProperty({ required: true })
  @IsString()
  synopsis: string;

  @ApiProperty({ required: true })
  @IsUrl()
  thumbnail: string;

  @ApiProperty({ required: true })
  @IsObject({ each: true, message: 'Gênero deve ser um objeto' })
  gender: Gender | Gender[];
}

type Gender = { id: string };
