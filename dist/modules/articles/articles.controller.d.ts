import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ArticleQueryDto } from './dto/article-query.dto';
import { MediaService } from '../media/media.service';
import { Article } from './entities/article.entity';
export declare class ArticlesController {
    private readonly articlesService;
    private readonly mediaService;
    constructor(articlesService: ArticlesService, mediaService: MediaService);
    create(createArticleDto: CreateArticleDto, files: Express.Multer.File[], req: any): Promise<Article>;
    findAll(queryDto: ArticleQueryDto): Promise<import("@/common/dto/pagination.dto").PaginatedResult<Article>>;
    search(query: string, page?: number, per_page?: number): Promise<import("@/common/dto/pagination.dto").PaginatedResult<Article>>;
    findByRubric(rubricId: string): Promise<Article[]>;
    findOne(id: string): Promise<Article>;
    update(id: string, updateArticleDto: UpdateArticleDto, req: any): Promise<Article>;
    remove(id: string, req: any): Promise<void>;
}
