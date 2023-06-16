import { Prisma } from '@prisma/client';

import {
  IsDateString,
  IsString,
  MinLength,
  IsOptional,
  IsUrl,
  IsObject,
} from 'class-validator';

export class CreateMangaDto implements Prisma.MangaCreateManyInput {
  @IsString({
    message: 'O título precisa ser uma string',
  })
  @MinLength(2, {
    message: 'O título precisa ter no mínimo 2 caracteres',
  })
  title: string;

  @IsDateString({}, { message: 'Data inválida' })
  releaseDate: Date;

  @IsString()
  @MinLength(2, {
    message: 'Autor precisa ter no mínimo 2 caracteres',
  })
  @IsOptional()
  author: string;

  @IsString()
  status: string;

  @IsString()
  slug: string;

  @IsString()
  synopsis: string;

  @IsUrl()
  thumbnail: string;

  @IsObject({ each: true, message: 'Gênero deve ser um objeto' })
  gender: Gender | Gender[];
}

type Gender = { id: number };
