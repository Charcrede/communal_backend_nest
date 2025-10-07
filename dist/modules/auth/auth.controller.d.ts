import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    private readonly logger;
    constructor(authService: AuthService);
    login(loginDto: {
        email: string;
        password: string;
    }): Promise<{
        access_token: string;
        user: {
            id: string;
            name: string;
            email: string;
            created_at: Date;
            updated_at: Date;
        };
    }>;
    adminLogin(loginDto: {
        email: string;
        password: string;
    }): Promise<{
        access_token: string;
        admin: {
            id: string;
            name: string;
            email: string;
            role: import("../admins/entities/admin.entity").AdminRole;
            created_at: Date;
            updated_at: Date;
        };
    }>;
}
