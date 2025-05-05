import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { setupOpenTelemetry } from './infrastructure/telemetry/opentelemetry';
import pino from 'pino-http';

async function bootstrap() {
  await setupOpenTelemetry();

  const app = await NestFactory.create(AppModule, { 
    logger: ['error', 'warn', 'log', 'debug'] 
  });

  app.use(pino({
    transport: process.env.NODE_ENV === 'development' ? {
      target: 'pino-pretty',
      options: {
        colorize: true,
      }
    } : undefined,
    level: process.env.LOG_LEVEL ?? 'info',
  }));

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  const config = new DocumentBuilder()
    .setTitle('Library Management System')
    .setDescription('Library API with hexagonal architecture and DDD')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors();

  const port = process.env.PORT ?? 3000

  await app.listen(port);
  console.log(`Application running on port ${port}`);
}
bootstrap(); 