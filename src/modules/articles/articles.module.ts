import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { Article } from './entities/article.entity';
import { RubricsModule } from '../rubrics/rubrics.module';
import { MediaModule } from '../media/media.module';
import { Media } from '../media/entities/media.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Article]),
    TypeOrmModule.forFeature([Media]),
    RubricsModule,
    MediaModule,
  ],
  controllers: [ArticlesController],
  providers: [ArticlesService],
  exports: [ArticlesService],
})
export class ArticlesModule {}