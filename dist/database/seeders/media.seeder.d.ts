import { MediaService } from '@/modules/media/media.service';
export declare class MediaSeeder {
    private readonly mediaService;
    constructor(mediaService: MediaService);
    seed(userId: string): Promise<void>;
}
