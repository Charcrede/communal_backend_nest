import { Repository } from 'typeorm';
import { Article } from './entities/article.entity';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ArticleQueryDto } from './dto/article-query.dto';
import { PaginatedResult } from '@/common/dto/pagination.dto';
import { RubricsService } from '../rubrics/rubrics.service';
import { MediaService } from '../media/media.service';
export declare class ArticlesService {
    private articlesRepository;
    private mediaService;
    private rubricsService;
    constructor(articlesRepository: Repository<Article>, mediaService: MediaService, rubricsService: RubricsService);
    create(createArticleDto: CreateArticleDto, createdBy: string): Promise<Article>;
    findAll(queryDto: ArticleQueryDto): Promise<PaginatedResult<Article>>;
    search(query: string, page?: number, per_page?: number): Promise<PaginatedResult<Article>>;
    findOne(id: string): Promise<Article>;
    findByRubric(rubricId: string): Promise<Article[]>;
    findByTitle(title: string): Promise<Article | null>;
    update(id: string, updateArticleDto: UpdateArticleDto, userId: string): Promise<Article>;
    remove(id: string, userId: string): Promise<void>;
}
