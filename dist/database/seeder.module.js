"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedersModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const seeder_service_1 = require("./seeder.service");
const admin_entity_1 = require("../modules/admins/entities/admin.entity");
const rubric_entity_1 = require("../modules/rubrics/entities/rubric.entity");
const article_entity_1 = require("../modules/articles/entities/article.entity");
const rubric_seeder_1 = require("./seeders/rubric.seeder");
const article_seeder_1 = require("./seeders/article.seeder");
const media_entity_1 = require("../modules/media/entities/media.entity");
let SeedersModule = class SeedersModule {
};
exports.SeedersModule = SeedersModule;
exports.SeedersModule = SeedersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([admin_entity_1.Admin, rubric_entity_1.Rubric, article_entity_1.Article, media_entity_1.Media]),
        ],
        providers: [
            seeder_service_1.SeederService,
            rubric_seeder_1.RubricSeeder,
            article_seeder_1.ArticleSeeder,
        ],
        exports: [seeder_service_1.SeederService],
    })
], SeedersModule);
//# sourceMappingURL=seeder.module.js.map