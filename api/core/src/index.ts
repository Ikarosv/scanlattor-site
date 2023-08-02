import { configure as serverlessExpress } from '@vendia/serverless-express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

let cachedServer;

export const handler = async (event, context) => {
  if (!cachedServer) {
    const nestApp = await NestFactory.create(AppModule);
    nestApp.enableCors({
      // origin: 'https://frontend-scanlattor-site.bohr.io',
      methods: 'GET,PUT,POST,DELETE',
      allowedHeaders: 'Content-Type,Authorization',
    });

    /* DOCUMENTAÇÃO */
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
    /*  */

    /* SERVERLESS */
    await nestApp.init();
    nestApp.useGlobalPipes(new ValidationPipe());
    cachedServer = serverlessExpress({
      app: nestApp.getHttpAdapter().getInstance(),
    });
  }

  return cachedServer(event, context);
};
