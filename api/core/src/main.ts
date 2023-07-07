import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule,
    // new FastifyAdapter(),
  );
  app.useGlobalPipes(new ValidationPipe());
  const port = process.env.PORT || 3001;
  await app.listen(port, '0.0.0.0');
  console.log(
    `\u001B[32m Server running on \u001B[0m http://localhost:${port}`,
  );
}
bootstrap();
