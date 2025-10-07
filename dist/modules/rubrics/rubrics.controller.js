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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RubricsController = void 0;
const common_1 = require("@nestjs/common");
const rubrics_service_1 = require("./rubrics.service");
const create_rubric_dto_1 = require("./dto/create-rubric.dto");
const update_rubric_dto_1 = require("./dto/update-rubric.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const admin_role_guard_1 = require("../auth/guards/admin-role.guard");
let RubricsController = class RubricsController {
    constructor(rubricsService) {
        this.rubricsService = rubricsService;
    }
    create(createRubricDto) {
        return this.rubricsService.create(createRubricDto);
    }
    findAll() {
        return this.rubricsService.findAll();
    }
    findOne(id) {
        return this.rubricsService.findOne(id);
    }
    update(id, updateRubricDto) {
        return this.rubricsService.update(id, updateRubricDto);
    }
    remove(id) {
        return this.rubricsService.remove(id);
    }
};
exports.RubricsController = RubricsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, admin_role_guard_1.AdminRoleGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_rubric_dto_1.CreateRubricDto]),
    __metadata("design:returntype", void 0)
], RubricsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RubricsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RubricsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, admin_role_guard_1.AdminRoleGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_rubric_dto_1.UpdateRubricDto]),
    __metadata("design:returntype", void 0)
], RubricsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, admin_role_guard_1.AdminRoleGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RubricsController.prototype, "remove", null);
exports.RubricsController = RubricsController = __decorate([
    (0, common_1.Controller)('rubrics'),
    __metadata("design:paramtypes", [rubrics_service_1.RubricsService])
], RubricsController);
//# sourceMappingURL=rubrics.controller.js.map