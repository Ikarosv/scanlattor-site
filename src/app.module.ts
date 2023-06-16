import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MangaModule } from './manga/manga.module';
import { UserModule } from './user/user.module';
import { ChapterModule } from './chapter/chapter.module';

@Module({
  imports: [MangaModule, UserModule, ChapterModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
