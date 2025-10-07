import { MediaType } from '../entities/media.entity';
export declare class CreateMediaDto {
    title: string;
    description?: string;
    type: MediaType;
    url: string;
    filename: string;
    size: number;
    article_id: string;
}
