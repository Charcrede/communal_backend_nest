"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AdminRoleGuard_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoleGuard = void 0;
const common_1 = require("@nestjs/common");
let AdminRoleGuard = AdminRoleGuard_1 = class AdminRoleGuard {
    constructor() {
        this.logger = new common_1.Logger(AdminRoleGuard_1.name);
    }
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        this.logger.debug('🔍 Vérification du guard AdminRoleGuard...');
        this.logger.debug(`User reçu : ${JSON.stringify(user, null, 2)}`);
        if (!user) {
            this.logger.warn('🚫 Aucun utilisateur trouvé dans la requête');
            throw new common_1.ForbiddenException('Aucun utilisateur authentifié');
        }
        if (user.type !== 'admin') {
            this.logger.warn(`🚫 Accès refusé — type utilisateur: ${user.type}`);
            throw new common_1.ForbiddenException('Accès réservé aux administrateurs');
        }
        this.logger.log(`✅ Accès autorisé à l’admin ${user.email || user.id}`);
        return true;
    }
};
exports.AdminRoleGuard = AdminRoleGuard;
exports.AdminRoleGuard = AdminRoleGuard = AdminRoleGuard_1 = __decorate([
    (0, common_1.Injectable)()
], AdminRoleGuard);
//# sourceMappingURL=admin-role.guard.js.map