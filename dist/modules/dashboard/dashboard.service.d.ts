import { Repository } from 'typeorm';
import { Rubric } from '../rubrics/entities/rubric.entity';
import { Article } from '../articles/entities/article.entity';
import { Media } from '../media/entities/media.entity';
import { Admin } from '../admins/entities/admin.entity';
export declare class DashboardService {
    private readonly rubricRepository;
    private readonly articleRepository;
    private readonly mediaRepository;
    private readonly adminRepository;
    constructor(rubricRepository: Repository<Rubric>, articleRepository: Repository<Article>, mediaRepository: Repository<Media>, adminRepository: Repository<Admin>);
    getSuperDashboard(): Promise<{
        lastUpdate: Date;
        overview: {
            rubrics: {
                total: number;
            };
            articles: {
                total: number;
            };
            medias: {
                total: number;
            };
            admins: {
                total: number;
            };
        };
        recentActivity: {
            articles: Article[];
            rubrics: Rubric[];
            medias: Media[];
            admins: Admin[];
        };
    }>;
    getAdminDashboard(adminId: string): Promise<{
        lastUpdate: Date;
        overview: {
            articles: {
                total: number;
            };
        };
        recentActivity: {
            articles: Article[];
        };
    }>;
}
