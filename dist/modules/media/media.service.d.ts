import { Repository } from 'typeorm';
import { Media } from './entities/media.entity';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { PaginatedResult } from '@/common/dto/pagination.dto';
export declare class MediaService {
    private mediaRepository;
    constructor(mediaRepository: Repository<Media>);
    create(createMediaDto: CreateMediaDto, createdBy: string): Promise<Media>;
    findAll(): Promise<Media[]>;
    updateUrl(id: string, url: string): Promise<Media>;
    search(query: string, page?: number, per_page?: number): Promise<PaginatedResult<Media>>;
    findUnlinked(page?: number, per_page?: number): Promise<{
        data: Media[];
        meta: {
            total: number;
            page: number;
            lastPage: number;
        };
    }>;
    findOne(id: string): Promise<Media>;
    update(id: string, updateMediaDto: UpdateMediaDto): Promise<Media>;
    remove(id: string): Promise<void>;
    removeByArticleId(articleId: string): Promise<void>;
}
