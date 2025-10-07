import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rubric } from '../rubrics/entities/rubric.entity';
import { Article } from '../articles/entities/article.entity';
import { Media } from '../media/entities/media.entity';
import { Admin } from '../admins/entities/admin.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Rubric)
    private readonly rubricRepository: Repository<Rubric>,
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
    @InjectRepository(Media)
    private readonly mediaRepository: Repository<Media>,
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
  ) {}

  // 🟩 Vue du super admin : tout le système
  async getSuperDashboard() {
    const [rubricsCount, articlesCount, mediasCount, adminsCount] =
      await Promise.all([
        this.rubricRepository.count(),
        this.articleRepository.count(),
        this.mediaRepository.count(),
        this.adminRepository.count(),
      ]);

    // on peut aussi trier par date de création pour les plus récents
    const recentArticles = await this.articleRepository.find({
      order: { created_at: 'DESC' },
      take: 5,
    });

    const recentRubrics = await this.rubricRepository.find({
      order: { created_at: 'DESC' },
      take: 5,
    });

    const recentMedias = await this.mediaRepository.find({
      order: { created_at: 'DESC' },
      take: 5,
    });

    const recentAdmins = await this.adminRepository.find({
      order: { created_at: 'DESC' },
      take: 5,
    });

    return {
      lastUpdate: new Date(),
      overview: {
        rubrics: { total: rubricsCount },
        articles: { total: articlesCount },
        medias: { total: mediasCount },
        admins: { total: adminsCount },
      },
      recentActivity: {
        articles: recentArticles,
        rubrics: recentRubrics,
        medias: recentMedias,
        admins: recentAdmins,
      },
    };
  }

  // 🟦 Vue d’un admin normal : données personnelles
  async getAdminDashboard(adminId: string) {
    const [myArticles] = await Promise.all([
      this.articleRepository.count({ where: { creator: { id: adminId } } }),
    ]);

    const recentArticles = await this.articleRepository.find({
      where: { creator: { id: adminId } },
      order: { created_at: 'DESC' },
      take: 5,
    });

    const recentMedias = await this.mediaRepository.find({
      order: { created_at: 'DESC' },
      take: 5,
    });

    return {
      lastUpdate: new Date(),
      overview: {
        articles: { total: myArticles },
      },
      recentActivity: {
        articles: recentArticles,
      },
    };
  }
}
