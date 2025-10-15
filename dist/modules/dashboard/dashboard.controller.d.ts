import { DashboardService } from './dashboard.service';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
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
    getAdminDashboard(req: any): Promise<{
        overview: {
            counts: {
                title: string;
                value: number;
                change: string;
                trend: string;
                icon: string;
                color: string;
            }[];
            recent: {
                title: string;
                type: string;
                action: string;
                time: Date;
            }[];
        };
    }>;
}
