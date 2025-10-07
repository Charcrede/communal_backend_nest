import { BaseEntity } from '@/common/entities/base.entity';
import { Article } from '@/modules/articles/entities/article.entity';
export declare class Rubric extends BaseEntity {
    name: string;
    slug: string;
    description: string;
    articles: Article[];
    generateSlug(): void;
}
