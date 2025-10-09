import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ArticleQueryDto } from './dto/article-query.dto';
import { MediaService } from '../media/media.service';
export declare class ArticlesController {
    private readonly articlesService;
    private readonly mediaService;
    private readonly logger;
    constructor(articlesService: ArticlesService, mediaService: MediaService);
    create(createArticleDto: CreateArticleDto, files: Express.Multer.File[], req: any): Promise<import("./entities/article.entity").Article>;
    findAll(queryDto: ArticleQueryDto): Promise<import("../../common/dto/pagination.dto").PaginatedResult<import("./entities/article.entity").Article>>;
    search(search: string, page?: number, per_page?: number): Promise<import("../../common/dto/pagination.dto").PaginatedResult<import("./entities/article.entity").Article>>;
    findByRubric(rubricId: string): Promise<import("./entities/article.entity").Article[]>;
    findOne(id: string): Promise<import("./entities/article.entity").Article>;
    update(id: string, updateArticleDto: UpdateArticleDto, req: any): Promise<import("./entities/article.entity").Article>;
    remove(id: string, req: any): Promise<void>;
}
