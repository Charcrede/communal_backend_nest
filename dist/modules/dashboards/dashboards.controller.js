"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const admin_role_guard_1 = require("../auth/guards/admin-role.guard");
const super_admin_guard_1 = require("../auth/guards/super-admin.guard");
const dashboards_service_1 = require("./dashboards.service");
let DashboardController = class DashboardController {
    constructor(dashboardService) {
        this.dashboardService = dashboardService;
    }
    async getSuperDashboard() {
        return this.dashboardService.getSuperDashboard();
    }
    async getAdminDashboard(req) {
        return this.dashboardService.getAdminDashboard(req.user.id);
    }
};
exports.DashboardController = DashboardController;
__decorate([
    (0, common_1.UseGuards)(super_admin_guard_1.SuperAdminGuard),
    (0, common_1.Get)('super'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getSuperDashboard", null);
__decorate([
    (0, common_1.Get)('admin'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getAdminDashboard", null);
exports.DashboardController = DashboardController = __decorate([
    (0, common_1.Controller)('dashboard'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, admin_role_guard_1.AdminRoleGuard),
    __metadata("design:paramtypes", [typeof (_a = typeof dashboards_service_1.DashboardService !== "undefined" && dashboards_service_1.DashboardService) === "function" ? _a : Object])
], DashboardController);
//# sourceMappingURL=dashboards.controller.js.map