import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { Admin, AdminRole } from '@/modules/admins/entities/admin.entity';
import { RubricSeeder } from './seeders/rubric.seeder';
import { ArticleSeeder } from './seeders/article.seeder';
import { MediaSeeder } from './seeders/media.seeder';

@Injectable()
export class SeederService {
  private readonly logger = new Logger(SeederService.name);

  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
    private readonly rubricSeeder: RubricSeeder,
    private readonly articleSeeder: ArticleSeeder,
    private readonly mediaSeeder: MediaSeeder,
  ) {}

  /**
   * Point d'entrée principal du seed
   */
  async seed() {
    this.logger.log('🚀 Démarrage du seed initial...');
    await this.seedSuperAdmin();
    this.logger.log('✅ Seed initial terminé.');
  }

  /**
   * Crée le super admin s'il n'existe pas
   * puis lance le seed des rubriques et articles
   */
  private async seedSuperAdmin() {
    const email = 'superadmin@communal.com';
    let superAdmin = await this.adminRepository.findOne({ where: { email } });

    if (superAdmin) {
      this.logger.log('Super admin déjà présent ✅');
    } else {
      const hashedPassword = await bcrypt.hash('Testing10@', 10);

      const newSuperAdmin = this.adminRepository.create({
        name: 'Charcre-bailse Kingnon',
        email,
        password: hashedPassword,
        role: AdminRole.SUPER_ADMIN,
      });

      superAdmin = await this.adminRepository.save(newSuperAdmin);
      this.logger.log('Super admin créé avec succès 🚀');
    }

    // Seeder les rubriques
    const rubrics = await this.rubricSeeder.seed();

    // Seeder les articles liés au super admin
    await this.articleSeeder.seed(rubrics, superAdmin.id);

    await this.mediaSeeder.seed(superAdmin.id);

    this.logger.log('Articles seedés avec succès ✨');
  }
}
