import { Module } from '@nestjs/common';
import { MangaController } from './manga.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { MangaService } from './manga.service';

@Module({
  imports: [PrismaModule],
  controllers: [MangaController],
  providers: [MangaService, PrismaService],
})
export class MangaModule {}
