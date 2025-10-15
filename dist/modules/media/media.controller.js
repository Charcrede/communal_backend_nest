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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaController = void 0;
const common_1 = require("@nestjs/common");
const media_service_1 = require("./media.service");
const create_media_dto_1 = require("./dto/create-media.dto");
const update_media_dto_1 = require("./dto/update-media.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const admin_role_guard_1 = require("../auth/guards/admin-role.guard");
const media_entity_1 = require("./entities/media.entity");
const cloudinary_1 = require("cloudinary");
const path_1 = require("path");
const fs = __importStar(require("fs/promises"));
const conditional_file_interceptor_1 = require("./conditional-file.interceptor");
let MediaController = class MediaController {
    constructor(mediaService) {
        this.mediaService = mediaService;
    }
    async create(createMediaDto, file, req) {
        const userId = req.user.id;
        cloudinary_1.v2.config({
            cloud_name: 'deh7gkg1l',
            api_key: '113828242843515',
            api_secret: 'M7RcCpvbJGzxOGmqoY_U7r79t3M',
        });
        if (createMediaDto.youtubeUrl) {
            createMediaDto.url = createMediaDto.youtubeUrl;
            createMediaDto.type = media_entity_1.MediaType.VIDEO;
            createMediaDto.filename = `youtube-${Date.now()}.txt`;
            createMediaDto.size = 0;
            if (!createMediaDto.description) {
                createMediaDto.description = `Vidéo YouTube : ${createMediaDto.youtubeUrl}`;
            }
            const media = await this.mediaService.create(createMediaDto, userId);
            return media;
        }
        if (!file)
            throw new Error('Aucun fichier fourni');
        createMediaDto.url = `/uploads/${file.filename}`;
        createMediaDto.filename = file.filename;
        createMediaDto.size = file.size;
        createMediaDto.type = file.mimetype.startsWith('image/')
            ? media_entity_1.MediaType.IMAGE
            : file.mimetype.startsWith('video/')
                ? media_entity_1.MediaType.VIDEO
                : media_entity_1.MediaType.AUDIO;
        if (!createMediaDto.description) {
            createMediaDto.description = `Fichier ${file.originalname}`;
        }
        const media = await this.mediaService.create(createMediaDto, userId);
        try {
            const filePath = (0, path_1.join)(process.cwd(), 'uploads', file.filename);
            const uploadResult = await cloudinary_1.v2.uploader.upload(filePath, {
                folder: 'medias',
                resource_type: 'auto',
                public_id: media.filename.split('.')[0],
            });
            await this.mediaService.updateUrl(media.id, uploadResult.secure_url);
            await fs.unlink(filePath);
        }
        catch (error) {
            console.error(`Erreur Cloudinary pour le fichier ${file.filename}`, error);
        }
        return this.mediaService.findOne(media.id);
    }
    async findUnlinked(page = 1, per_page = 10) {
        return this.mediaService.findUnlinked(Number(page), Number(per_page));
    }
    async search(search, page = 1, perPage = 10) {
        return this.mediaService.search(search, Number(page), Number(perPage));
    }
    findAll() {
        return this.mediaService.findAll();
    }
    findOne(id) {
        return this.mediaService.findOne(id);
    }
    update(id, updateMediaDto) {
        return this.mediaService.update(id, updateMediaDto);
    }
    remove(id) {
        return this.mediaService.remove(id);
    }
};
exports.MediaController = MediaController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, admin_role_guard_1.AdminRoleGuard),
    (0, common_1.UseInterceptors)((0, conditional_file_interceptor_1.ConditionalFileInterceptor)('file')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_media_dto_1.CreateMediaDto, Object, Object]),
    __metadata("design:returntype", Promise)
], MediaController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('unlinked'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('per_page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MediaController.prototype, "findUnlinked", null);
__decorate([
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)('search')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('per_page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], MediaController.prototype, "search", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, admin_role_guard_1.AdminRoleGuard),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MediaController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, admin_role_guard_1.AdminRoleGuard),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MediaController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, admin_role_guard_1.AdminRoleGuard),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_media_dto_1.UpdateMediaDto]),
    __metadata("design:returntype", void 0)
], MediaController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, admin_role_guard_1.AdminRoleGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MediaController.prototype, "remove", null);
exports.MediaController = MediaController = __decorate([
    (0, common_1.Controller)('medias'),
    __metadata("design:paramtypes", [media_service_1.MediaService])
], MediaController);
//# sourceMappingURL=media.controller.js.map