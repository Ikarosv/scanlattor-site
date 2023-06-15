import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MangaModule } from './manga/manga.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [MangaModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
