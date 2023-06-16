import { Module } from '@nestjs/common';
import { ChapterController } from './chapter.controler';
import { ChapterService } from './chapter.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ChapterController],
  providers: [ChapterService, PrismaService],
})
export class ChapterModule {}
