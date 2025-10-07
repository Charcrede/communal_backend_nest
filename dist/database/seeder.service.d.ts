import { Repository } from 'typeorm';
import { Admin } from '@/modules/admins/entities/admin.entity';
import { RubricSeeder } from './seeders/rubric.seeder';
import { ArticleSeeder } from './seeders/article.seeder';
export declare class SeederService {
    private readonly adminRepository;
    private readonly rubricSeeder;
    private readonly articleSeeder;
    private readonly logger;
    constructor(adminRepository: Repository<Admin>, rubricSeeder: RubricSeeder, articleSeeder: ArticleSeeder);
    seed(): Promise<void>;
    private seedSuperAdmin;
}
