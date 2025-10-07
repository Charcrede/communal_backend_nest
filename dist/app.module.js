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
var AppModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const uuid_1 = require("uuid");
const database_config_1 = require("./config/database.config");
const users_module_1 = require("./modules/users/users.module");
const admins_module_1 = require("./modules/admins/admins.module");
const rubrics_module_1 = require("./modules/rubrics/rubrics.module");
const articles_module_1 = require("./modules/articles/articles.module");
const media_module_1 = require("./modules/media/media.module");
const auth_module_1 = require("./modules/auth/auth.module");
const seeder_module_1 = require("./database/seeder.module");
const seeder_service_1 = require("./database/seeder.service");
const dashboard_module_1 = require("./modules/dashboard/dashboard.module");
let AppModule = AppModule_1 = class AppModule {
    constructor(seederService) {
        this.seederService = seederService;
        this.logger = new common_1.Logger(AppModule_1.name);
    }
    async onApplicationBootstrap() {
        this.logger.log('Démarrage du seed initial...');
        try {
            await this.seederService.seed();
            this.logger.log('Seed initial terminé ✅');
        }
        catch (err) {
            this.logger.error('Erreur lors du seed initial', err);
        }
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = AppModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            typeorm_1.TypeOrmModule.forRootAsync({ useClass: database_config_1.DatabaseConfig }),
            platform_express_1.MulterModule.register({
                storage: (0, multer_1.diskStorage)({
                    destination: './uploads',
                    filename: (req, file, cb) => {
                        const uniqueName = `${(0, uuid_1.v4)()}${(0, path_1.extname)(file.originalname)}`;
                        cb(null, uniqueName);
                    },
                }),
            }),
            users_module_1.UsersModule,
            admins_module_1.AdminsModule,
            rubrics_module_1.RubricsModule,
            articles_module_1.ArticlesModule,
            media_module_1.MediaModule,
            auth_module_1.AuthModule,
            seeder_module_1.SeedersModule,
            dashboard_module_1.DashboardModule,
        ],
        providers: [common_1.Logger],
    }),
    __metadata("design:paramtypes", [seeder_service_1.SeederService])
], AppModule);
//# sourceMappingURL=app.module.js.map