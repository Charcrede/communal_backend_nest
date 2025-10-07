import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { Rubric } from '../rubrics/entities/rubric.entity';
import { Article } from '../articles/entities/article.entity';
import { Media } from '../media/entities/media.entity';
import { Admin } from '../admins/entities/admin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rubric, Article, Media, Admin])],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
