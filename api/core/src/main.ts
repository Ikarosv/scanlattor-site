import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import { ServerlessAdapter } from '@h4ad/serverless-adapter';
import { LazyFramework } from '@h4ad/serverless-adapter/lib/frameworks/lazy';
import { ExpressFramework } from '@h4ad/serverless-adapter/lib/frameworks/express';
import { DefaultHandler } from '@h4ad/serverless-adapter/lib/handlers/default';
import { PromiseResolver } from '@h4ad/serverless-adapter/lib/resolvers/promise';
import { ApiGatewayV2Adapter } from '@h4ad/serverless-adapter/lib/adapters/aws';
// import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  try {
    const nestApp = await NestFactory.create(
      AppModule,
      new ExpressAdapter(),
    );
    await nestApp.init()
    // const prismaService = nestApp.get(PrismaService);
    // await prismaService.enableShutdownHooks(nestApp)
    nestApp.useGlobalPipes(new ValidationPipe());
    // if (process.env.JWT_SECRET === 'secret') {
    //   const port = process.env.PORT || 3001;
    //   await nestApp.listen(port, '0.0.0.0');
    //   console.log(
    //     `\u001B[32m Server running on \u001B[0m http://localhost:${port}`,
    //   );
    //   return;
    // }
    const app = nestApp.getHttpAdapter().getInstance();
    return app
  } catch (err) {
    console.error(err)
  }
}

bootstrap();
