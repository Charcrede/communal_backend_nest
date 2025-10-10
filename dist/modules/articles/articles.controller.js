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
var ArticlesController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticlesController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const articles_service_1 = require("./articles.service");
const create_article_dto_1 = require("./dto/create-article.dto");
const update_article_dto_1 = require("./dto/update-article.dto");
const article_query_dto_1 = require("./dto/article-query.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const admin_role_guard_1 = require("../auth/guards/admin-role.guard");
const media_service_1 = require("../media/media.service");
const media_entity_1 = require("../media/entities/media.entity");
const multer_1 = require("multer");
const path_1 = require("path");
const fs_1 = require("fs");
const cloudinary_1 = require("cloudinary");
let ArticlesController = ArticlesController_1 = class ArticlesController {
    constructor(articlesService, mediaService) {
        this.articlesService = articlesService;
        this.mediaService = mediaService;
        this.logger = new common_1.Logger(ArticlesController_1.name);
    }
    async create(createArticleDto, files, req) {
        cloudinary_1.v2.config({
            cloud_name: 'deh7gkg1l',
            api_key: '113828242843515',
            api_secret: 'M7RcCpvbJGzxOGmqoY_U7r79t3M'
        });
        const article = await this.articlesService.create(createArticleDto, req.user.id);
        if (files && files.length > 0) {
            for (const [i, file] of files.entries()) {
                const media = await this.mediaService.create({
                    title: file.originalname,
                    description: `Média n°${i + 1} pour l'article ${article.title}`,
                    type: file.mimetype.startsWith('image/')
                        ? media_entity_1.MediaType.IMAGE
                        : file.mimetype.startsWith('video/')
                            ? media_entity_1.MediaType.VIDEO
                            : media_entity_1.MediaType.AUDIO,
                    filename: file.filename,
                    url: `/uploads/${file.filename}`,
                    size: file.size,
                    article_id: article.id,
                });
                try {
                    const filePath = (0, path_1.join)(process.cwd(), 'uploads', file.filename);
                    const uploadResult = await cloudinary_1.v2.uploader.upload(filePath, {
                        folder: 'articles',
                        resource_type: 'auto',
                        public_id: media.filename.split('.')[0],
                    });
                    await this.mediaService.updateUrl(media.id, uploadResult.secure_url);
                    await fs_1.promises.unlink((0, path_1.join)(process.cwd(), 'uploads', file.filename));
                }
                catch (error) {
                    this.logger.error(`Erreur Cloudinary pour le fichier ${file.filename}`, error);
                }
            }
        }
        return this.articlesService.findOne(article.id);
    }
    async findAll(queryDto) {
        return this.articlesService.findAll(queryDto);
    }
    search(search, page = 1, per_page = 10) {
        return this.articlesService.search(search, +page, +per_page);
    }
    findByRubric(rubricId) {
        return this.articlesService.findByRubric(rubricId);
    }
    findOne(id) {
        return this.articlesService.findOne(id);
    }
    update(id, updateArticleDto, req) {
        return this.articlesService.update(id, updateArticleDto, req.user.id);
    }
    remove(id, req) {
        return this.articlesService.remove(id, req.user.id);
    }
};
exports.ArticlesController = ArticlesController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, admin_role_guard_1.AdminRoleGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', 10, {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads',
            filename: (req, file, callback) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const ext = (0, path_1.extname)(file.originalname);
                callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
            },
        }),
        limits: { fileSize: 10 * 1024 * 1024 },
    })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_article_dto_1.CreateArticleDto, Array, Object]),
    __metadata("design:returntype", Promise)
], ArticlesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [article_query_dto_1.ArticleQueryDto]),
    __metadata("design:returntype", Promise)
], ArticlesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)('search')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('per_page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], ArticlesController.prototype, "search", null);
__decorate([
    (0, common_1.Get)('by-rubric/:rubricId'),
    __param(0, (0, common_1.Param)('rubricId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ArticlesController.prototype, "findByRubric", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ArticlesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, admin_role_guard_1.AdminRoleGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_article_dto_1.UpdateArticleDto, Object]),
    __metadata("design:returntype", void 0)
], ArticlesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, admin_role_guard_1.AdminRoleGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ArticlesController.prototype, "remove", null);
exports.ArticlesController = ArticlesController = ArticlesController_1 = __decorate([
    (0, common_1.Controller)('articles'),
    __metadata("design:paramtypes", [articles_service_1.ArticlesService,
        media_service_1.MediaService])
], ArticlesController);
//# sourceMappingURL=articles.controller.js.map