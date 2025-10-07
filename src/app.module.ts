import { Module, OnApplicationBootstrap, Logger } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';

import { DatabaseConfig } from './config/database.config';
import { UsersModule } from './modules/users/users.module';
import { AdminsModule } from './modules/admins/admins.module';
import { RubricsModule } from './modules/rubrics/rubrics.module';
import { ArticlesModule } from './modules/articles/articles.module';
import { MediaModule } from './modules/media/media.module';
import { AuthModule } from './modules/auth/auth.module';
import { SeedersModule } from './database/seeder.module';
import { SeederService } from './database/seeder.service'; // ✅ Import uniquement pour injection, pas comme provider
import { DashboardModule } from './modules/dashboard/dashboard.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({ useClass: DatabaseConfig }),
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueName = `${uuidv4()}${extname(file.originalname)}`;
          cb(null, uniqueName);
        },
      }),
    }),
    // === modules applicatifs ===
    UsersModule,
    AdminsModule,
    RubricsModule,
    ArticlesModule,
    MediaModule,
    AuthModule,
    // === seeders ===
    SeedersModule,
    DashboardModule,
  ],
  providers: [Logger], // ✅ on laisse juste Logger ici
})
export class AppModule implements OnApplicationBootstrap {
  private readonly logger = new Logger(AppModule.name);

  constructor(private readonly seederService: SeederService) {}

  async onApplicationBootstrap() {
    this.logger.log('Démarrage du seed initial...');
    try {
      await this.seederService.seed();
      this.logger.log('Seed initial terminé ✅');
    } catch (err) {
      this.logger.error('Erreur lors du seed initial', err);
    }
  }
}
