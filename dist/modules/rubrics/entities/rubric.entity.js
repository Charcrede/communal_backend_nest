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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rubric = void 0;
const typeorm_1 = require("typeorm");
const slugify_1 = __importDefault(require("slugify"));
const base_entity_1 = require("../../../common/entities/base.entity");
const article_entity_1 = require("../../articles/entities/article.entity");
let Rubric = class Rubric extends base_entity_1.BaseEntity {
    generateSlug() {
        if (this.name) {
            this.slug = (0, slugify_1.default)(this.name, { lower: true, strict: true });
        }
    }
};
exports.Rubric = Rubric;
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], Rubric.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, unique: true }),
    __metadata("design:type", String)
], Rubric.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], Rubric.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => article_entity_1.Article, (article) => article.rubric),
    __metadata("design:type", Array)
], Rubric.prototype, "articles", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Rubric.prototype, "generateSlug", null);
exports.Rubric = Rubric = __decorate([
    (0, typeorm_1.Entity)('rubrics')
], Rubric);
//# sourceMappingURL=rubric.entity.js.map