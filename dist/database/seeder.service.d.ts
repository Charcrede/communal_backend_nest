import { Repository } from 'typeorm';
import { Admin } from '@/modules/admins/entities/admin.entity';
import { RubricSeeder } from './seeders/rubric.seeder';
import { ArticleSeeder } from './seeders/article.seeder';
import { MediaSeeder } from './seeders/media.seeder';
export declare class SeederService {
    private readonly adminRepository;
    private readonly rubricSeeder;
    private readonly articleSeeder;
    private readonly mediaSeeder;
    private readonly logger;
    constructor(adminRepository: Repository<Admin>, rubricSeeder: RubricSeeder, articleSeeder: ArticleSeeder, mediaSeeder: MediaSeeder);
    seed(): Promise<void>;
    private seedSuperAdmin;
}
