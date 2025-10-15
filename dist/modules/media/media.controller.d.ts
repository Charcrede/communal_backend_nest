import { MediaService } from './media.service';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
export declare class MediaController {
    private readonly mediaService;
    constructor(mediaService: MediaService);
    create(createMediaDto: CreateMediaDto, file: Express.Multer.File, req: any): Promise<import("./entities/media.entity").Media>;
    findUnlinked(page?: number, per_page?: number): Promise<{
        data: import("./entities/media.entity").Media[];
        meta: {
            total: number;
            page: number;
            lastPage: number;
        };
    }>;
    search(search: string, page?: number, perPage?: number): Promise<import("../../common/dto/pagination.dto").PaginatedResult<import("./entities/media.entity").Media>>;
    findAll(): Promise<import("./entities/media.entity").Media[]>;
    findOne(id: string): Promise<import("./entities/media.entity").Media>;
    update(id: string, updateMediaDto: UpdateMediaDto): Promise<import("./entities/media.entity").Media>;
    remove(id: string): Promise<void>;
}
