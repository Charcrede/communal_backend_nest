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
var RubricsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RubricsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const rubric_entity_1 = require("./entities/rubric.entity");
const common_2 = require("@nestjs/common");
let RubricsService = RubricsService_1 = class RubricsService {
    constructor(rubricsRepository) {
        this.rubricsRepository = rubricsRepository;
        this.logger = new common_2.Logger(RubricsService_1.name);
    }
    async create(createRubricDto) {
        const rubric = this.rubricsRepository.create(createRubricDto);
        this.logger.log("je suis arrivé ici");
        try {
            return await this.rubricsRepository.save(rubric);
        }
        catch (error) {
            if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
                throw new common_1.ConflictException('Rubric with this name already exists');
            }
            throw error;
        }
    }
    async findAll() {
        return this.rubricsRepository.find({
            relations: ['articles', 'articles.creator', 'articles.media'],
            order: { created_at: 'DESC' },
        });
    }
    async findOne(id) {
        const rubric = await this.rubricsRepository.findOne({
            where: { id },
            relations: ['articles', 'articles.creator', 'articles.media'],
        });
        if (!rubric) {
            throw new common_1.NotFoundException('Rubric not found');
        }
        return rubric;
    }
    async update(id, updateRubricDto) {
        const rubric = await this.findOne(id);
        Object.assign(rubric, updateRubricDto);
        try {
            return await this.rubricsRepository.save(rubric);
        }
        catch (error) {
            if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
                throw new common_1.ConflictException('Rubric with this name already exists');
            }
            throw error;
        }
    }
    async remove(id) {
        const result = await this.rubricsRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException('Rubric not found');
        }
    }
};
exports.RubricsService = RubricsService;
exports.RubricsService = RubricsService = RubricsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(rubric_entity_1.Rubric)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RubricsService);
//# sourceMappingURL=rubrics.service.js.map