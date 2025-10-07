import { DashboardService } from './dashboards.service';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    getSuperDashboard(): Promise<any>;
    getAdminDashboard(req: any): Promise<any>;
}
