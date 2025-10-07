import { BaseEntity } from '@/common/entities/base.entity';
import { Article } from '@/modules/articles/entities/article.entity';
export declare enum AdminRole {
    ADMIN = "admin",
    SUPER_ADMIN = "super_admin"
}
export declare class Admin extends BaseEntity {
    name: string;
    email: string;
    password: string;
    role: AdminRole;
    articles: Article[];
    isAdmin(): boolean;
    isSuperAdmin(): boolean;
}
