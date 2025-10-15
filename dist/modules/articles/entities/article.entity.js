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
exports.Article = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../common/entities/base.entity");
const rubric_entity_1 = require("../../rubrics/entities/rubric.entity");
const admin_entity_1 = require("../../admins/entities/admin.entity");
const media_entity_1 = require("../../media/entities/media.entity");
let Article = class Article extends base_entity_1.BaseEntity {
};
exports.Article = Article;
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], Article.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Article.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid'),
    __metadata("design:type", String)
], Article.prototype, "rubric_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], Article.prototype, "head", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid'),
    __metadata("design:type", String)
], Article.prototype, "created_by", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => rubric_entity_1.Rubric, (rubric) => rubric.articles),
    (0, typeorm_1.JoinColumn)({ name: 'rubric_id' }),
    __metadata("design:type", rubric_entity_1.Rubric)
], Article.prototype, "rubric", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => admin_entity_1.Admin, (admin) => admin.articles),
    (0, typeorm_1.JoinColumn)({ name: 'created_by' }),
    __metadata("design:type", admin_entity_1.Admin)
], Article.prototype, "creator", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => media_entity_1.Media, (media) => media.article),
    __metadata("design:type", Array)
], Article.prototype, "media", void 0);
exports.Article = Article = __decorate([
    (0, typeorm_1.Entity)('articles')
], Article);
//# sourceMappingURL=article.entity.js.map