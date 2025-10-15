import { BaseEntity } from '@/common/entities/base.entity';
import { Article } from '@/modules/articles/entities/article.entity';
import { Admin } from '@/modules/admins/entities/admin.entity';
export declare enum MediaType {
    IMAGE = "image",
    VIDEO = "video",
    AUDIO = "audio"
}
export declare class Media extends BaseEntity {
    title: string;
    description: string;
    type: MediaType;
    url: string;
    youtubeUrl: string;
    filename: string;
    size: number;
    article_id: string;
    created_by: string;
    creator: Admin;
    article: Article;
}
