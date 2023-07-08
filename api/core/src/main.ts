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

async function bootstrap() {
  const nestApp = await NestFactory.create(
    AppModule,
    new ExpressAdapter(),
  );
  await nestApp.init()
  nestApp.useGlobalPipes(new ValidationPipe());
  const app = nestApp.getHttpAdapter().getInstance();
  return app
  const port = process.env.PORT || 3001;
  await nestApp.listen(port, '0.0.0.0');
  console.log(
    `\u001B[32m Server running on \u001B[0m http://localhost:${port}`,
  );
}
// bootstrap();
const expressFramework = new ExpressFramework();
// the initialization of nestjs is asynchronous, so you can use the lazy framework.
const framework = new LazyFramework(expressFramework, bootstrap);

export const handler = ServerlessAdapter.new(null)
  .setFramework(framework)
  .setHandler(new DefaultHandler())
  .setResolver(new PromiseResolver())
  .addAdapter(new ApiGatewayV2Adapter())
  .build();
