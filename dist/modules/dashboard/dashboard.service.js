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
const typeorm_3 = require("typeorm");
const date_fns_1 = require("date-fns");
let DashboardService = class DashboardService {
    constructor(rubricRepository, articleRepository, mediaRepository, adminRepository) {
        this.rubricRepository = rubricRepository;
        this.articleRepository = articleRepository;
        this.mediaRepository = mediaRepository;
        this.adminRepository = adminRepository;
    }
    async getSuperDashboard() {
        const now = new Date();
        const startOfThisWeek = (0, date_fns_1.startOfWeek)(now, { weekStartsOn: 1 });
        const startOfLastWeek = (0, date_fns_1.subWeeks)(startOfThisWeek, 1);
        const endOfLastWeek = (0, date_fns_1.endOfWeek)(startOfLastWeek, { weekStartsOn: 1 });
        const [rubricsCount, articlesCount, mediasCount, adminsCount] = await Promise.all([
            this.rubricRepository.count(),
            this.articleRepository.count(),
            this.mediaRepository.count(),
            this.adminRepository.count(),
        ]);
        const [lastRubric, lastArticle, lastMedia, lastAdmin] = await Promise.all([
            this.rubricRepository.findOne({
                where: {},
                order: { created_at: 'DESC' },
                select: ['id', 'name', 'created_at'],
            }),
            this.articleRepository.findOne({
                where: {},
                order: { created_at: 'DESC' },
                select: ['id', 'title', 'created_at'],
            }),
            this.mediaRepository.findOne({
                where: {},
                order: { created_at: 'DESC' },
                select: ['id', 'description', 'url', 'created_at'],
            }),
            this.adminRepository.findOne({
                where: {},
                order: { created_at: 'DESC' },
                select: ['id', 'name', 'created_at'],
            }),
        ]);
        const [articlesThisWeek, articlesLastWeek, mediasThisWeek, mediasLastWeek, super_admins, admins,] = await Promise.all([
            this.articleRepository.count({ where: { created_at: (0, typeorm_3.MoreThanOrEqual)(startOfThisWeek) } }),
            this.articleRepository.count({ where: { created_at: (0, typeorm_3.Between)(startOfLastWeek, endOfLastWeek) } }),
            this.mediaRepository.count({ where: { created_at: (0, typeorm_3.MoreThanOrEqual)(startOfThisWeek) } }),
            this.mediaRepository.count({ where: { created_at: (0, typeorm_3.Between)(startOfLastWeek, endOfLastWeek) } }),
            this.adminRepository.count({ where: { role: admin_entity_1.AdminRole.SUPER_ADMIN } }),
            this.adminRepository.count({ where: { role: admin_entity_1.AdminRole.ADMIN } }),
        ]);
        const getTrend = (thisWeek, lastWeek) => {
            if (thisWeek > lastWeek)
                return 'increase';
            if (thisWeek < lastWeek)
                return 'decrease';
            return 'same';
        };
        const articlesTrend = getTrend(articlesThisWeek, articlesLastWeek);
        const mediasTrend = getTrend(mediasThisWeek, mediasLastWeek);
        return {
            overview: {
                counts: [
                    {
                        title: "Rubriques",
                        value: rubricsCount,
                        change: "Complet",
                        icon: 'FolderOpen',
                        color: "text-blue-600 bg-blue-100",
                    },
                    {
                        title: "Articles",
                        value: articlesCount,
                        change: articlesTrend === 'increase'
                            ? `+${articlesThisWeek - articlesLastWeek} cette semaine`
                            : articlesTrend === 'decrease'
                                ? `-${articlesLastWeek - articlesThisWeek} cette semaine`
                                : "Stable",
                        trend: articlesTrend,
                        icon: 'FileText',
                        color: "text-green-600 bg-green-100",
                    },
                    {
                        title: "Médias",
                        value: mediasCount,
                        change: mediasTrend === 'increase'
                            ? `+${mediasThisWeek - mediasLastWeek} cette semaine`
                            : mediasTrend === 'decrease'
                                ? `-${mediasLastWeek - mediasThisWeek} cette semaine`
                                : "Stable",
                        trend: mediasTrend,
                        icon: 'Image',
                        color: "text-purple-600 bg-purple-100",
                    },
                    {
                        title: "Administrateurs",
                        value: adminsCount,
                        change: `${super_admins} super admin / ${admins} admin`,
                        trend: 'same',
                        icon: 'Users',
                        color: "text-orange-600 bg-orange-100",
                    },
                ],
                lasts: [
                    {
                        title: lastArticle ? lastArticle.title : "Aucun article",
                        type: "article",
                        action: "Article créé",
                        time: lastArticle ? lastArticle.created_at : null,
                    },
                    {
                        title: lastRubric ? lastRubric.name : "Aucune rubrique",
                        type: "rubric",
                        action: "Rubrique créée",
                        time: lastRubric ? lastRubric.created_at : null,
                    },
                    {
                        title: lastMedia ? lastMedia.description : "Aucun média",
                        type: "media",
                        action: "Média créé",
                        time: lastMedia ? lastMedia.created_at : null,
                    },
                    {
                        title: lastAdmin ? lastAdmin.name : "Aucun administrateur",
                        type: "admin",
                        action: "Administrateur créé",
                        time: lastAdmin ? lastAdmin.created_at : null,
                    },
                ],
            },
        };
    }
    async getAdminDashboard(adminId) {
        const myArticlesCount = await this.articleRepository.count({
            where: { creator: { id: adminId } },
        });
        const lastMyArticle = await this.articleRepository.findOne({
            where: { creator: { id: adminId } },
            order: { created_at: 'DESC' },
            select: ['id', 'title', 'created_at'],
        });
        const lastMedia = await this.mediaRepository.findOne({
            order: { created_at: 'DESC' },
            select: ['id', 'description', 'url'],
        });
        return {
            lastUpdate: new Date(),
            overview: {
                myArticles: { total: myArticlesCount, last: lastMyArticle },
                lastMedia,
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