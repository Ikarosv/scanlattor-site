import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  try {
    const nestApp = await NestFactory.create(AppModule, new ExpressAdapter());
    nestApp.useGlobalPipes(new ValidationPipe());
    nestApp.enableCors({
      origin: '*',
      methods: 'GET,PUT,POST,DELETE',
      allowedHeaders: 'Content-Type,Authorization',
    });
    const port = process.env.PORT || 3001;
    const config = new DocumentBuilder()
      .setTitle('Scanlattor API')
      .setDescription('Scanlattor API description')
      .setVersion('1.0')
      .addTag(
        'Authenticathor',
        'Operações relacionadas a autenticação do usuário, como login, registro e recuperação de senha',
      )
      .addTag('Mangas', 'CRUD dos mangas')
      .build();
    const document = SwaggerModule.createDocument(nestApp, config);
    SwaggerModule.setup('documentation', nestApp, document);
    await nestApp.listen(port, '0.0.0.0');
    console.log(
      `\u001B[32m Server running on \u001B[0m http://localhost:${port}`,
    );
    return;
  } catch (err) {
    console.error(err);
  }
}

bootstrap();
