import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MangaModule } from './manga/manga.module';
import { UserModule } from './user/user.module';
import { ChapterModule } from './chapter/chapter.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { CaslModule } from './casl/casl.module';
import { PoliciesGuard } from './policies-guard/policies-guard.guard';

@Module({
  imports: [MangaModule, UserModule, ChapterModule, AuthModule, CaslModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PoliciesGuard,
    }
  ],
})
export class AppModule {}
