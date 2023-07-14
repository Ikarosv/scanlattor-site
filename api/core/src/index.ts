import { configure as serverlessExpress } from '@vendia/serverless-express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

let cachedServer;

export const handler = async (event, context) => {
  if (!cachedServer) {
    const nestApp = await NestFactory.create(AppModule);
    await nestApp.init();
    nestApp.useGlobalPipes(new ValidationPipe());
    cachedServer = serverlessExpress({ app: nestApp.getHttpAdapter().getInstance() });
  }

  return cachedServer(event, context);
}

// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { ValidationPipe } from '@nestjs/common';
// import { ExpressAdapter } from '@nestjs/platform-express';
// import { ServerlessAdapter } from '@h4ad/serverless-adapter';
// import { LazyFramework } from '@h4ad/serverless-adapter/lib/frameworks/lazy';
// import { ExpressFramework } from '@h4ad/serverless-adapter/lib/frameworks/express';
// import { DefaultHandler } from '@h4ad/serverless-adapter/lib/handlers/default';
// import { PromiseResolver } from '@h4ad/serverless-adapter/lib/resolvers/promise';
// import { ApiGatewayV2Adapter } from '@h4ad/serverless-adapter/lib/adapters/aws';
// // import { PrismaService } from './prisma/prisma.service';

// async function bootstrap() {
//   try {
//     const nestApp = await NestFactory.create(
//       AppModule,
//       new ExpressAdapter(),
//     );
//     await nestApp.init()
//     // const prismaService = nestApp.get(PrismaService);
//     // await prismaService.enableShutdownHooks(nestApp)
//     nestApp.useGlobalPipes(new ValidationPipe());

//     const app = nestApp.getHttpAdapter().getInstance();
//     return app
//   } catch (err) {
//     console.error(err)
//   }
// }



// const expressFramework = new ExpressFramework();
// // the initialization of nestjs is asynchronous, so you can use the lazy framework.
// const framework = new LazyFramework(expressFramework, bootstrap);

// export const handler = ServerlessAdapter.new(null)
//   .setFramework(framework)
//   .setHandler(new DefaultHandler())
//   .setResolver(new PromiseResolver())
//   .addAdapter(new ApiGatewayV2Adapter())
//   .build();
