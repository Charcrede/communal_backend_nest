import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class AdminRoleGuard implements CanActivate {
    private readonly logger;
    canActivate(context: ExecutionContext): boolean;
}
