"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var SeederService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeederService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = __importStar(require("bcrypt"));
const admin_entity_1 = require("../modules/admins/entities/admin.entity");
const rubric_seeder_1 = require("./seeders/rubric.seeder");
const article_seeder_1 = require("./seeders/article.seeder");
const media_seeder_1 = require("./seeders/media.seeder");
let SeederService = SeederService_1 = class SeederService {
    constructor(adminRepository, rubricSeeder, articleSeeder, mediaSeeder) {
        this.adminRepository = adminRepository;
        this.rubricSeeder = rubricSeeder;
        this.articleSeeder = articleSeeder;
        this.mediaSeeder = mediaSeeder;
        this.logger = new common_1.Logger(SeederService_1.name);
    }
    async seed() {
        this.logger.log('🚀 Démarrage du seed initial...');
        await this.seedSuperAdmin();
        this.logger.log('✅ Seed initial terminé.');
    }
    async seedSuperAdmin() {
        const email = 'superadmin@communal.com';
        let superAdmin = await this.adminRepository.findOne({ where: { email } });
        if (superAdmin) {
            this.logger.log('Super admin déjà présent ✅');
        }
        else {
            const hashedPassword = await bcrypt.hash('Testing10@', 10);
            const newSuperAdmin = this.adminRepository.create({
                name: 'Charcre-bailse Kingnon',
                email,
                password: hashedPassword,
                role: admin_entity_1.AdminRole.SUPER_ADMIN,
            });
            superAdmin = await this.adminRepository.save(newSuperAdmin);
            this.logger.log('Super admin créé avec succès 🚀');
        }
        const rubrics = await this.rubricSeeder.seed();
        await this.articleSeeder.seed(rubrics, superAdmin.id);
        await this.mediaSeeder.seed(superAdmin.id);
        this.logger.log('Articles seedés avec succès ✨');
    }
};
exports.SeederService = SeederService;
exports.SeederService = SeederService = SeederService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(admin_entity_1.Admin)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        rubric_seeder_1.RubricSeeder,
        article_seeder_1.ArticleSeeder,
        media_seeder_1.MediaSeeder])
], SeederService);
//# sourceMappingURL=seeder.service.js.map