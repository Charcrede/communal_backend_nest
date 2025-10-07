import { Injectable, CanActivate, ExecutionContext, ForbiddenException, Logger } from '@nestjs/common';

@Injectable()
export class AdminRoleGuard implements CanActivate {
  private readonly logger = new Logger(AdminRoleGuard.name);

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Log complet du user reçu
    this.logger.debug('🔍 Vérification du guard AdminRoleGuard...');
    this.logger.debug(`User reçu : ${JSON.stringify(user, null, 2)}`);

    // Si aucun utilisateur n'est attaché à la requête
    if (!user) {
      this.logger.warn('🚫 Aucun utilisateur trouvé dans la requête');
      throw new ForbiddenException('Aucun utilisateur authentifié');
    }

    // Vérification du type d'utilisateur
    if (user.type !== 'admin') {
      this.logger.warn(`🚫 Accès refusé — type utilisateur: ${user.type}`);
      throw new ForbiddenException('Accès réservé aux administrateurs');
    }

    // Si tout est bon
    this.logger.log(`✅ Accès autorisé à l’admin ${user.email || user.id}`);
    return true;
  }
}
