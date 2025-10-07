import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class DatabaseConfig implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const type = this.configService.get<string>('DATABASE_TYPE', 'sqlite');
    
    if (type === 'sqlite') {
      return {
        type: 'sqlite',
        database: 'cms.sqlite',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
        logging: true,
      };
    }

    return {
      type: 'postgres',
      host: this.configService.get<string>('DATABASE_HOST'),
      port: this.configService.get<number>('DATABASE_PORT'),
      username: this.configService.get<string>('DATABASE_USERNAME'),
      password: this.configService.get<string>('DATABASE_PASSWORD'),
      database: this.configService.get<string>('DATABASE_NAME'),
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: true,
    };
  }
}