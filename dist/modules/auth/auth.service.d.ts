import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { AdminsService } from '../admins/admins.service';
import { User } from '../users/entities/user.entity';
import { Admin } from '../admins/entities/admin.entity';
export declare class AuthService {
    private usersService;
    private adminsService;
    private jwtService;
    private readonly logger;
    constructor(usersService: UsersService, adminsService: AdminsService, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<User | null>;
    validateAdmin(email: string, password: string): Promise<Admin | null>;
    loginUser(user: User): Promise<{
        access_token: string;
        user: {
            id: string;
            name: string;
            email: string;
            created_at: Date;
            updated_at: Date;
        };
    }>;
    loginAdmin(admin: Admin): Promise<{
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
