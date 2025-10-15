import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeederService } from './seeder.service';
import { Admin } from '@/modules/admins/entities/admin.entity';
import { Rubric } from '@/modules/rubrics/entities/rubric.entity';
import { Article } from '@/modules/articles/entities/article.entity';
import { RubricSeeder } from './seeders/rubric.seeder';
import { ArticleSeeder } from './seeders/article.seeder';
import { Media } from '@/modules/media/entities/media.entity';
import { MediaSeeder } from './seeders/media.seeder';
import { MediaService } from '@/modules/media/media.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin, Rubric, Article, Media]),
  ],
  providers: [
    SeederService,
    RubricSeeder,
    ArticleSeeder,
    MediaSeeder,
    MediaService,
  ],
  exports: [SeederService],
})
export class SeedersModule {}
