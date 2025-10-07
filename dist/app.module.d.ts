import { OnApplicationBootstrap } from '@nestjs/common';
import { SeederService } from './database/seeder.service';
export declare class AppModule implements OnApplicationBootstrap {
    private readonly seederService;
    private readonly logger;
    constructor(seederService: SeederService);
    onApplicationBootstrap(): Promise<void>;
}
