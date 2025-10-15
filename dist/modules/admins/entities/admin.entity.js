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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = exports.AdminRole = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../common/entities/base.entity");
const article_entity_1 = require("../../articles/entities/article.entity");
const media_entity_1 = require("../../media/entities/media.entity");
var AdminRole;
(function (AdminRole) {
    AdminRole["ADMIN"] = "admin";
    AdminRole["SUPER_ADMIN"] = "super_admin";
})(AdminRole || (exports.AdminRole = AdminRole = {}));
let Admin = class Admin extends base_entity_1.BaseEntity {
    isAdmin() {
        return this.role === AdminRole.ADMIN || this.role === AdminRole.SUPER_ADMIN;
    }
    isSuperAdmin() {
        return this.role === AdminRole.SUPER_ADMIN;
    }
};
exports.Admin = Admin;
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], Admin.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, unique: true }),
    __metadata("design:type", String)
], Admin.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Admin.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        enum: AdminRole,
        default: AdminRole.ADMIN,
    }),
    __metadata("design:type", String)
], Admin.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => article_entity_1.Article, (article) => article.creator),
    __metadata("design:type", Array)
], Admin.prototype, "articles", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => media_entity_1.Media, (media) => media.creator),
    __metadata("design:type", Array)
], Admin.prototype, "medias", void 0);
exports.Admin = Admin = __decorate([
    (0, typeorm_1.Entity)('admins')
], Admin);
//# sourceMappingURL=admin.entity.js.map