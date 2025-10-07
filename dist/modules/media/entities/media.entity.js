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
exports.Media = exports.MediaType = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../common/entities/base.entity");
const article_entity_1 = require("../../articles/entities/article.entity");
var MediaType;
(function (MediaType) {
    MediaType["IMAGE"] = "image";
    MediaType["VIDEO"] = "video";
    MediaType["AUDIO"] = "audio";
})(MediaType || (exports.MediaType = MediaType = {}));
let Media = class Media extends base_entity_1.BaseEntity {
};
exports.Media = Media;
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], Media.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], Media.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        enum: MediaType,
    }),
    __metadata("design:type", String)
], Media.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 500 }),
    __metadata("design:type", String)
], Media.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], Media.prototype, "filename", void 0);
__decorate([
    (0, typeorm_1.Column)('integer'),
    __metadata("design:type", Number)
], Media.prototype, "size", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid'),
    __metadata("design:type", String)
], Media.prototype, "article_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => article_entity_1.Article, (article) => article.media),
    (0, typeorm_1.JoinColumn)({ name: 'article_id' }),
    __metadata("design:type", article_entity_1.Article)
], Media.prototype, "article", void 0);
exports.Media = Media = __decorate([
    (0, typeorm_1.Entity)('media')
], Media);
//# sourceMappingURL=media.entity.js.map