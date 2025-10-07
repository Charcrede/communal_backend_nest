import { Repository } from 'typeorm';
import { Article } from '../../modules/articles/entities/article.entity';
import { Media } from '../../modules/media/entities/media.entity';
import { Rubric } from '../../modules/rubrics/entities/rubric.entity';
export declare class ArticleSeeder {
    private articleRepository;
    private mediaRepository;
    private readonly logger;
    constructor(articleRepository: Repository<Article>, mediaRepository: Repository<Media>);
    seed(rubrics: Rubric[], userId: string): Promise<void>;
}
