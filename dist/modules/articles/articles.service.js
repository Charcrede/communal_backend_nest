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
exports.ArticlesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const article_entity_1 = require("./entities/article.entity");
const rubrics_service_1 = require("../rubrics/rubrics.service");
const media_service_1 = require("../media/media.service");
let ArticlesService = class ArticlesService {
    constructor(articlesRepository, mediaService, rubricsService) {
        this.articlesRepository = articlesRepository;
        this.mediaService = mediaService;
        this.rubricsService = rubricsService;
    }
    async create(createArticleDto, createdBy) {
        await this.rubricsService.findOne(createArticleDto.rubric_id);
        const article = this.articlesRepository.create({
            ...createArticleDto,
            created_by: createdBy,
        });
        return this.articlesRepository.save(article);
    }
    async findAll(queryDto) {
        const { page = 1, per_page = 10, rubric, rubric_id, exclude_rubric, exclude_rubric_id, search } = queryDto;
        const queryBuilder = this.articlesRepository
            .createQueryBuilder('article')
            .leftJoinAndSelect('article.rubric', 'rubric')
            .leftJoinAndSelect('article.creator', 'creator')
            .leftJoinAndSelect('article.media', 'media');
        if (rubric_id) {
            queryBuilder.andWhere('article.rubric_id = :rubric_id', { rubric_id });
        }
        else if (rubric) {
            queryBuilder.andWhere('rubric.slug = :rubric', { rubric });
        }
        if (exclude_rubric_id) {
            queryBuilder.andWhere('article.rubric_id != :exclude_rubric_id', { exclude_rubric_id });
        }
        else if (exclude_rubric) {
            queryBuilder.andWhere('rubric.slug != :exclude_rubric', { exclude_rubric });
        }
        if (search) {
            queryBuilder.andWhere('(article.title ILIKE :search OR article.content ILIKE :search)', { search: `%${search}%` });
        }
        queryBuilder.orderBy('article.created_at', 'DESC');
        const total = await queryBuilder.getCount();
        const articles = await queryBuilder
            .skip((page - 1) * per_page)
            .take(per_page)
            .getMany();
        return {
            data: articles,
            total,
            page,
            per_page,
            total_pages: Math.ceil(total / per_page),
        };
    }
    async search(query, page = 1, per_page = 10) {
        const [articles, total] = await this.articlesRepository.findAndCount({
            where: [
                { title: (0, typeorm_2.Like)(`%${query}%`) },
                { content: (0, typeorm_2.Like)(`%${query}%`) },
            ],
            relations: ['rubric', 'creator', 'media'],
            order: { created_at: 'DESC' },
            skip: (page - 1) * per_page,
            take: per_page,
        });
        return {
            data: articles,
            total,
            page,
            per_page,
            total_pages: Math.ceil(total / per_page),
        };
    }
    async findOne(id) {
        const article = await this.articlesRepository.findOne({
            where: { id: id },
            relations: ['rubric', 'creator', 'media'],
        });
        if (!article) {
            throw new common_1.NotFoundException('Article not found');
        }
        return article;
    }
    async findByRubric(rubricId) {
        return this.articlesRepository.find({
            where: { rubric_id: rubricId },
            relations: ['rubric', 'creator', 'media'],
            order: { created_at: 'DESC' },
        });
    }
    async findByTitle(title) {
        return this.articlesRepository.findOne({
            where: { title: title },
            relations: ['rubric', 'creator', 'media'],
        });
    }
    async update(id, updateArticleDto, userId) {
        const article = await this.findOne(id);
        if (article.created_by !== userId) {
            throw new common_1.ForbiddenException('Vous pouvez seulement modifier vos propres articles');
        }
        if (updateArticleDto.rubric_id) {
            await this.rubricsService.findOne(updateArticleDto.rubric_id);
        }
        await this.articlesRepository.update(id, updateArticleDto);
        return this.findOne(id);
    }
    async remove(id, userId) {
        const article = await this.findOne(id);
        if (article.created_by !== userId) {
            throw new common_1.ForbiddenException('Vous pouvez seulement supprimer vos propres articles');
        }
        await this.mediaService.removeByArticleId(article.id);
        const result = await this.articlesRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException('Article not found');
        }
    }
};
exports.ArticlesService = ArticlesService;
exports.ArticlesService = ArticlesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(article_entity_1.Article)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        media_service_1.MediaService,
        rubrics_service_1.RubricsService])
], ArticlesService);
//# sourceMappingURL=articles.service.js.map