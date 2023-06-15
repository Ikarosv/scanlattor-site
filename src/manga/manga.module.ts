import { Module } from '@nestjs/common';
import { MangaController } from './manga.controller';

@Module({
  imports: [],
  controllers: [MangaController],
  providers: [],
})
export class MangaModule {}
