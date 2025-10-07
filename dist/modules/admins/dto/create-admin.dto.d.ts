import { AdminRole } from '../entities/admin.entity';
export declare class CreateAdminDto {
    name: string;
    email: string;
    password: string;
    role?: AdminRole;
}
