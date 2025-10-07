import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminRoleGuard } from '../auth/guards/admin-role.guard';
import { SuperAdminGuard } from '../auth/guards/super-admin.guard';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
@UseGuards(JwtAuthGuard, AdminRoleGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  // 🟩 Super admin — vue globale
  @UseGuards(SuperAdminGuard)
  @Get('super')
  async getSuperDashboard() {
    return this.dashboardService.getSuperDashboard();
  }

  // 🟦 Admin — vue restreinte à ses propres données
  @Get('admin')
  async getAdminDashboard(@Req() req) {
    return this.dashboardService.getAdminDashboard(req.user.id);
  }
}
