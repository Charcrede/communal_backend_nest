import { DashboardService } from './dashboard.service';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
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
            articles: import("../articles/entities/article.entity").Article[];
            rubrics: import("../rubrics/entities/rubric.entity").Rubric[];
            medias: import("../media/entities/media.entity").Media[];
            admins: import("../admins/entities/admin.entity").Admin[];
        };
    }>;
    getAdminDashboard(req: any): Promise<{
        lastUpdate: Date;
        overview: {
            articles: {
                total: number;
            };
        };
        recentActivity: {
            articles: import("../articles/entities/article.entity").Article[];
        };
    }>;
}
