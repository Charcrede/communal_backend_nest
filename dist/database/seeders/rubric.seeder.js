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
var RubricSeeder_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RubricSeeder = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const rubric_entity_1 = require("../../modules/rubrics/entities/rubric.entity");
let RubricSeeder = RubricSeeder_1 = class RubricSeeder {
    constructor(rubricRepository) {
        this.rubricRepository = rubricRepository;
        this.logger = new common_1.Logger(RubricSeeder_1.name);
    }
    async seed() {
        const rubricsData = [
            {
                name: 'La voix du maire',
                slug: 'maire',
                description: 'Informations officielles et messages adressés à la population par le maire, incluant les projets en cours et les décisions municipales.',
            },
            {
                name: 'La voix du conseil communal',
                slug: 'conseil',
                description: 'Comptes rendus des réunions du conseil communal, résolutions adoptées et orientations stratégiques pour la commune.',
            },
            {
                name: 'La voix du conseiller local',
                slug: 'conseiller',
                description: 'Initiatives et actions menées par les conseillers locaux, ainsi que leurs interventions auprès des citoyens.',
            },
            {
                name: 'Publi-reportage',
                slug: 'publi',
                description: 'Articles promotionnels et reportages sponsorisés mettant en valeur des entreprises, événements ou projets locaux.',
            },
        ];
        const existing = await this.rubricRepository.find();
        if (existing.length > 0) {
            this.logger.log('Rubriques déjà présentes ✅');
            return existing;
        }
        const rubrics = this.rubricRepository.create(rubricsData);
        await this.rubricRepository.save(rubrics);
        this.logger.log(`${rubrics.length} rubriques insérées ✅`);
        return rubrics;
    }
};
exports.RubricSeeder = RubricSeeder;
exports.RubricSeeder = RubricSeeder = RubricSeeder_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(rubric_entity_1.Rubric)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RubricSeeder);
//# sourceMappingURL=rubric.seeder.js.map