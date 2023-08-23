import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { WinstonModule } from 'nest-winston';
import { instance } from 'logger/winston.logger';

const PORT = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      instance: instance,
    }),
  });

  // validate all apis with DTO
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  // specify global prefix
  app.setGlobalPrefix('/api/v1');

  // setup swagger documentation
  const config = new DocumentBuilder()
    .setTitle('DevHub API')
    .setDescription('Swagger OpenAPI documentation for DevHub API')
    .setVersion('1.0')
    .setContact(
      'Timothy',
      'https://github.com/Timothy-py',
      'adeyeyetimothy33@gmail.com',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/doc', app, document);

  // ****api docs available @ http://localhost:PORT/api/doc

  await app.listen(PORT);
}
bootstrap();

