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
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = __importStar(require("bcrypt"));
const users_service_1 = require("../users/users.service");
const admins_service_1 = require("../admins/admins.service");
const common_2 = require("@nestjs/common");
let AuthService = AuthService_1 = class AuthService {
    constructor(usersService, adminsService, jwtService) {
        this.usersService = usersService;
        this.adminsService = adminsService;
        this.jwtService = jwtService;
        this.logger = new common_2.Logger(AuthService_1.name);
    }
    async validateUser(email, password) {
        const user = await this.usersService.findByEmail(email);
        if (user && await bcrypt.compare(password, user.password)) {
            return user;
        }
        return null;
    }
    async validateAdmin(email, password) {
        try {
            const admin = await this.adminsService.findByEmail(email);
            if (admin && await bcrypt.compare(password, admin.password)) {
                return admin;
            }
            return null;
        }
        catch (error) {
            this.logger.error('Error in validateAdmin', error);
            throw error;
        }
    }
    async loginUser(user) {
        const payload = { email: user.email, sub: user.id, type: 'user' };
        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                created_at: user.created_at,
                updated_at: user.updated_at,
            },
        };
    }
    async loginAdmin(admin) {
        const payload = { email: admin.email, sub: admin.id, type: 'admin', role: admin.role };
        this.logger.log("Payload for admin login: " + JSON.stringify(payload));
        return {
            access_token: this.jwtService.sign(payload, { secret: process.env.JWT_SECRET, expiresIn: process.env.JWT_EXPIRES_IN }),
            admin: {
                id: admin.id,
                name: admin.name,
                email: admin.email,
                role: admin.role,
                created_at: admin.created_at,
                updated_at: admin.updated_at,
            },
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        admins_service_1.AdminsService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map