import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { DataSource } from 'typeorm';
import { Admin, AdminRole } from './modules/admins/entities/admin.entity';
import * as bcrypt from 'bcrypt';
import * as express from 'express';
import { join } from 'path';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

  const configService = app.get(ConfigService);

  // Configuration globale
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  const config = new DocumentBuilder()
    .setTitle('API Docs')
    .setDescription('Endpoints disponibles')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());

  // CORS
  app.enableCors({
    origin: ['http://localhost:3001', 'http://localhost:3002', 'https://communal-info-web-tv.vercel.app', 'https://communal-admin.vercel.app/'], // ou "*" en dev
    credentials: true,
  });

  const dataSource = app.get(DataSource);


  const port = configService.get<number>('PORT') || 3000;
  await app.listen(port);

  console.log(`🚀 Server running on http://localhost:${port}`);
}

bootstrap();