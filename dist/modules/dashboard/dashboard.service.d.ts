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
        overview: {
            counts: ({
                title: string;
                value: number;
                change: string;
                icon: string;
                color: string;
                trend?: undefined;
            } | {
                title: string;
                value: number;
                change: string;
                trend: string;
                icon: string;
                color: string;
            })[];
            lasts: {
                title: string;
                type: string;
                action: string;
                time: Date;
            }[];
        };
    }>;
    getAdminDashboard(adminId: string): Promise<{
        lastUpdate: Date;
        overview: {
            myArticles: {
                total: number;
                last: Article;
            };
            lastMedia: Media;
        };
    }>;
}
