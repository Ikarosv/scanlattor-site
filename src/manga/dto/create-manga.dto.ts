import {
  IsArray,
  IsDateString,
  IsString,
  MinLength,
  IsOptional,
} from 'class-validator';

export class CreateMangaDto {
  @IsString({
    message: 'Title precisa ser uma string',
  })
  @MinLength(2, {
    message: 'Title precisa ter no mínimo 2 caracteres',
  })
  title: string;

  @IsDateString()
  releaseDate: string;

  @IsString()
  @MinLength(2, {
    message: 'Author precisa ter no mínimo 2 caracteres',
  })
  @IsOptional()
  author: string;

  @IsString()
  status: string;

  @IsArray()
  chapters: object[];
}

/*
model Manga {
  id        Int      @id @default(autoincrement())
  title     String
  author    String
  status    String
  chapters  Chapter[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("mangas")
}
 */
