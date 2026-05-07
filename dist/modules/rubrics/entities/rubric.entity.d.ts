import { BaseEntity } from '@/common/entities/base.entity';
import { Article } from '@/modules/articles/entities/article.entity';
import { Media } from '@/modules/media/entities/media.entity';
export declare class Rubric extends BaseEntity {
    name: string;
    slug: string;
    description: string;
    articles: Article[];
    medias: Media[];
    generateSlug(): void;
}
