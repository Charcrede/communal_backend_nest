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
exports.MediaService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const fs_1 = require("fs");
const path_1 = require("path");
const media_entity_1 = require("./entities/media.entity");
let MediaService = class MediaService {
    constructor(mediaRepository) {
        this.mediaRepository = mediaRepository;
    }
    async create(createMediaDto, createdBy) {
        const media = this.mediaRepository.create({ ...createMediaDto, created_by: createdBy });
        return this.mediaRepository.save(media);
    }
    async findAll() {
        return this.mediaRepository.find({
            relations: ['article'],
            order: { created_at: 'DESC' },
        });
    }
    async updateUrl(id, url) {
        const media = await this.mediaRepository.findOne({ where: { id } });
        if (!media) {
            throw new common_1.NotFoundException(`Media with id ${id} not found`);
        }
        media.url = url;
        return this.mediaRepository.save(media);
    }
    async search(query, page = 1, per_page = 10) {
        const [medias, total] = await this.mediaRepository.findAndCount({
            where: [
                { title: (0, typeorm_2.Like)(`%${query}%`) },
                { description: (0, typeorm_2.Like)(`%${query}%`) },
            ],
            relations: ['creator'],
            order: { created_at: 'DESC' },
            skip: (page - 1) * per_page,
            take: per_page,
        });
        return {
            data: medias,
            total,
            page,
            per_page,
            total_pages: Math.ceil(total / per_page),
        };
    }
    async findUnlinked(page = 1, per_page = 10) {
        const [data, total] = await this.mediaRepository.findAndCount({
            where: { article: (0, typeorm_2.IsNull)() },
            order: { created_at: 'DESC' },
            relations: ['creator'],
            skip: (page - 1) * per_page,
            take: per_page,
        });
        return {
            data,
            meta: {
                total,
                page,
                lastPage: Math.ceil(total / per_page),
            },
        };
    }
    async findOne(id) {
        const media = await this.mediaRepository.findOne({
            where: { id },
            relations: ['article'],
        });
        if (!media) {
            throw new common_1.NotFoundException('Media not found');
        }
        return media;
    }
    async update(id, updateMediaDto) {
        await this.findOne(id);
        await this.mediaRepository.update(id, updateMediaDto);
        return this.findOne(id);
    }
    async remove(id) {
        const media = await this.findOne(id);
        try {
            const filePath = (0, path_1.join)(process.cwd(), 'uploads', media.filename);
            (0, fs_1.unlinkSync)(filePath);
        }
        catch (error) {
            console.error('Error deleting file:', error);
        }
        const result = await this.mediaRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException('Media not found');
        }
    }
    removeByArticleId(articleId) {
        return this.mediaRepository
            .delete({ article: { id: articleId } })
            .then(() => undefined);
    }
};
exports.MediaService = MediaService;
exports.MediaService = MediaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(media_entity_1.Media)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MediaService);
//# sourceMappingURL=media.service.js.map