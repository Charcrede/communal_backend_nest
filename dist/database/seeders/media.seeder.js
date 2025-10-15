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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaSeeder = void 0;
const common_1 = require("@nestjs/common");
const media_service_1 = require("../../modules/media/media.service");
const media_entity_1 = require("../../modules/media/entities/media.entity");
let MediaSeeder = class MediaSeeder {
    constructor(mediaService) {
        this.mediaService = mediaService;
    }
    async seed(userId) {
        const user_id = userId;
        const videos = [
            { url: 'https://youtu.be/0aSG0l8oIHM', title: 'Vidéo 1' },
            { url: 'https://youtu.be/3xQ80DOkN1A', title: 'Vidéo 2' },
            { url: 'https://youtu.be/ZtXWvvsy7VQ', title: 'Vidéo 3' },
            { url: 'https://youtu.be/fiqxEb_URX0', title: 'Vidéo 4' },
            { url: 'https://youtu.be/Ulu4WnE8CYw', title: 'Vidéo 5' },
        ];
        for (const video of videos) {
            await this.mediaService.create({
                title: video.title,
                description: `Vidéo YouTube : ${video.url}`,
                type: media_entity_1.MediaType.VIDEO,
                article_id: null,
                url: video.url,
                youtubeUrl: video.url,
                filename: `youtube-${Date.now()}-${Math.floor(Math.random() * 1e6)}.txt`,
                size: 0,
            }, user_id);
        }
        console.log('Seeder medias terminé ✅');
    }
};
exports.MediaSeeder = MediaSeeder;
exports.MediaSeeder = MediaSeeder = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [media_service_1.MediaService])
], MediaSeeder);
//# sourceMappingURL=media.seeder.js.map