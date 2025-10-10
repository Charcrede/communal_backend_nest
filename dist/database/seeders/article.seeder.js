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
var ArticleSeeder_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleSeeder = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const article_entity_1 = require("../../modules/articles/entities/article.entity");
const media_entity_1 = require("../../modules/media/entities/media.entity");
const uuid_1 = require("uuid");
let ArticleSeeder = ArticleSeeder_1 = class ArticleSeeder {
    constructor(articleRepository, mediaRepository) {
        this.articleRepository = articleRepository;
        this.mediaRepository = mediaRepository;
        this.logger = new common_1.Logger(ArticleSeeder_1.name);
    }
    async seed(rubrics, userId) {
        const count = await this.articleRepository.count();
        if (count > 0) {
            this.logger.log('Articles déjà présents ✅');
            return;
        }
        const mediaFiles = [
            "https://res.cloudinary.com/deh7gkg1l/image/upload/v1760049733/articles/files-1760049730169-476913983.jpg",
            "https://res.cloudinary.com/deh7gkg1l/image/upload/v1760049648/articles/files-1760049645958-620652665.jpg",
            "https://res.cloudinary.com/deh7gkg1l/image/upload/v1760049648/articles/files-1760049645958-620652665.jpg",
            "https://res.cloudinary.com/deh7gkg1l/video/upload/v1760049215/articles/files-1760049199561-827404564.mp4",
        ];
        const titles = [
            'Les bienfaits de la méditation quotidienne', 'Comment cuisiner un plat marocain traditionnel', 'Les tendances mode 2025', 'Astuces pour économiser sur ses factures', 'Top 10 des destinations de voyage en été', 'L’importance de l’hydratation pour la santé', 'Le guide complet du potager bio', 'Comment bien débuter en photographie', 'Les erreurs à éviter lors d’un entretien d’embauche', 'Recette facile de pain maison', 'Les bases du développement web', 'Comment organiser un événement réussi', 'Les secrets d’un sommeil réparateur', 'Initiation au yoga pour débutants', 'La transition vers l’énergie solaire', 'Les aliments à privilégier pour la mémoire', 'Comment créer un budget mensuel efficace', 'Idées de décoration intérieure modernes', 'Les avantages du télétravail', 'Le guide du café parfait'
        ];
        for (let i = 0; i < titles.length; i++) {
            const title = titles[i];
            const rubric = rubrics[i % rubrics.length];
            const article = this.articleRepository.create({
                title,
                content: `Voici un article détaillé sur : ${title}.`,
                rubric,
                created_by: userId,
            });
            const savedArticle = await this.articleRepository.save(article);
            const fileName = mediaFiles[Math.floor(Math.random() * mediaFiles.length)];
            const extension = fileName.split('.').pop()?.toLowerCase();
            let type = media_entity_1.MediaType.IMAGE;
            if (['mp4', 'avi', 'mov', 'wmv'].includes(extension)) {
                type = media_entity_1.MediaType.VIDEO;
            }
            await this.mediaRepository.save(this.mediaRepository.create({
                id: (0, uuid_1.v4)(),
                article_id: savedArticle.id,
                title: `Media illustrant ${title}`,
                description: `Un média pour ${title}`,
                type,
                filename: fileName,
                url: `${fileName}`,
                size: Math.floor(Math.random() * (500000 - 50000) + 50000),
            }));
        }
        this.logger.log(`${titles.length} articles insérés ✅`);
    }
};
exports.ArticleSeeder = ArticleSeeder;
exports.ArticleSeeder = ArticleSeeder = ArticleSeeder_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(article_entity_1.Article)),
    __param(1, (0, typeorm_1.InjectRepository)(media_entity_1.Media)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ArticleSeeder);
//# sourceMappingURL=article.seeder.js.map