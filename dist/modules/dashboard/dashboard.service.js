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
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const rubric_entity_1 = require("../rubrics/entities/rubric.entity");
const article_entity_1 = require("../articles/entities/article.entity");
const media_entity_1 = require("../media/entities/media.entity");
const admin_entity_1 = require("../admins/entities/admin.entity");
let DashboardService = class DashboardService {
    constructor(rubricRepository, articleRepository, mediaRepository, adminRepository) {
        this.rubricRepository = rubricRepository;
        this.articleRepository = articleRepository;
        this.mediaRepository = mediaRepository;
        this.adminRepository = adminRepository;
    }
    async getSuperDashboard() {
        const [rubricsCount, articlesCount, mediasCount, adminsCount] = await Promise.all([
            this.rubricRepository.count(),
            this.articleRepository.count(),
            this.mediaRepository.count(),
            this.adminRepository.count(),
        ]);
        const recentArticles = await this.articleRepository.find({
            order: { created_at: 'DESC' },
            take: 5,
        });
        const recentRubrics = await this.rubricRepository.find({
            order: { created_at: 'DESC' },
            take: 5,
        });
        const recentMedias = await this.mediaRepository.find({
            order: { created_at: 'DESC' },
            take: 5,
        });
        const recentAdmins = await this.adminRepository.find({
            order: { created_at: 'DESC' },
            take: 5,
        });
        return {
            lastUpdate: new Date(),
            overview: {
                rubrics: { total: rubricsCount },
                articles: { total: articlesCount },
                medias: { total: mediasCount },
                admins: { total: adminsCount },
            },
            recentActivity: {
                articles: recentArticles,
                rubrics: recentRubrics,
                medias: recentMedias,
                admins: recentAdmins,
            },
        };
    }
    async getAdminDashboard(adminId) {
        const [myArticles] = await Promise.all([
            this.articleRepository.count({ where: { creator: { id: adminId } } }),
        ]);
        const recentArticles = await this.articleRepository.find({
            where: { creator: { id: adminId } },
            order: { created_at: 'DESC' },
            take: 5,
        });
        const recentMedias = await this.mediaRepository.find({
            order: { created_at: 'DESC' },
            take: 5,
        });
        return {
            lastUpdate: new Date(),
            overview: {
                articles: { total: myArticles },
            },
            recentActivity: {
                articles: recentArticles,
            },
        };
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(rubric_entity_1.Rubric)),
    __param(1, (0, typeorm_1.InjectRepository)(article_entity_1.Article)),
    __param(2, (0, typeorm_1.InjectRepository)(media_entity_1.Media)),
    __param(3, (0, typeorm_1.InjectRepository)(admin_entity_1.Admin)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map