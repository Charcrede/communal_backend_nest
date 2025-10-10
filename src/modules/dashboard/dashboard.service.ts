import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rubric } from '../rubrics/entities/rubric.entity';
import { Article } from '../articles/entities/article.entity';
import { Media } from '../media/entities/media.entity';
import { Admin, AdminRole } from '../admins/entities/admin.entity';
import { Between, MoreThanOrEqual, LessThan } from 'typeorm';
import { subWeeks, startOfWeek, endOfWeek } from 'date-fns';
import { last } from 'rxjs';

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
  ) { }

  // 🟩 Vue du super admin : statistiques globales + derniers ajouts

  async getSuperDashboard() {
    const now = new Date();
    const startOfThisWeek = startOfWeek(now, { weekStartsOn: 1 }); // lundi
    const startOfLastWeek = subWeeks(startOfThisWeek, 1);
    const endOfLastWeek = endOfWeek(startOfLastWeek, { weekStartsOn: 1 });

    // === TOTALS ===
    const [rubricsCount, articlesCount, mediasCount, adminsCount] = await Promise.all([
      this.rubricRepository.count(),
      this.articleRepository.count(),
      this.mediaRepository.count(),
      this.adminRepository.count(),
    ]);

    // === LAST CREATED ===
    const [lastRubric, lastArticle, lastMedia, lastAdmin] = await Promise.all([
      this.rubricRepository.findOne({
        where: {},
        order: { created_at: 'DESC' },
        select: ['id', 'name', 'created_at'],
      }),
      this.articleRepository.findOne({
        where: {},
        order: { created_at: 'DESC' },
        select: ['id', 'title', 'created_at'],
      }),
      this.mediaRepository.findOne({
        where: {},
        order: { created_at: 'DESC' },
        select: ['id', 'description', 'url', 'created_at'],
      }),
      this.adminRepository.findOne({
        where: {},
        order: { created_at: 'DESC' },
        select: ['id', 'name', 'created_at'],
      }),
    ]);

    // === WEEKLY COUNTS ===
    const [
      articlesThisWeek,
      articlesLastWeek,
      mediasThisWeek,
      mediasLastWeek,
      super_admins,
      admins,
    ] = await Promise.all([
      this.articleRepository.count({ where: { created_at: MoreThanOrEqual(startOfThisWeek) } }),
      this.articleRepository.count({ where: { created_at: Between(startOfLastWeek, endOfLastWeek) } }),
      this.mediaRepository.count({ where: { created_at: MoreThanOrEqual(startOfThisWeek) } }),
      this.mediaRepository.count({ where: { created_at: Between(startOfLastWeek, endOfLastWeek) } }),
      this.adminRepository.count({ where: { role: AdminRole.SUPER_ADMIN } }),
      this.adminRepository.count({ where: { role: AdminRole.ADMIN } }),
    ]);

    // === TRENDS ===
    const getTrend = (thisWeek: number, lastWeek: number) => {
      if (thisWeek > lastWeek) return 'increase';
      if (thisWeek < lastWeek) return 'decrease';
      return 'same';
    };

    const articlesTrend = getTrend(articlesThisWeek, articlesLastWeek);
    const mediasTrend = getTrend(mediasThisWeek, mediasLastWeek);

    // === RESULT ===
    return {
      overview: {
        counts: [
          {
            title: "Rubriques",
            value: rubricsCount,
            change: "Complet",
            icon: 'FolderOpen',
            color: "text-blue-600 bg-blue-100",
          },
          {
            title: "Articles",
            value: articlesCount,
            change:
              articlesTrend === 'increase'
                ? `+${articlesThisWeek - articlesLastWeek} cette semaine`
                : articlesTrend === 'decrease'
                  ? `-${articlesLastWeek - articlesThisWeek} cette semaine`
                  : "Stable",
            trend: articlesTrend,
            icon: 'FileText',
            color: "text-green-600 bg-green-100",
          },
          {
            title: "Médias",
            value: mediasCount,
            change:
              mediasTrend === 'increase'
                ? `+${mediasThisWeek - mediasLastWeek} cette semaine`
                : mediasTrend === 'decrease'
                  ? `-${mediasLastWeek - mediasThisWeek} cette semaine`
                  : "Stable",
            trend: mediasTrend,
            icon: 'Image',
            color: "text-purple-600 bg-purple-100",
          },
          {
            title: "Administrateurs",
            value: adminsCount,
            change: `${super_admins} super admin / ${admins} admin`,
            trend: 'same',
            icon: 'Users',
            color: "text-orange-600 bg-orange-100",
          },
        ],
        lasts: [
          {
            title: lastArticle ? lastArticle.title : "Aucun article",
            type: "article",
            action: "Article créé",
            time: lastArticle ? lastArticle.created_at : null,
          },
          {
            title: lastRubric ? lastRubric.name : "Aucune rubrique",
            type: "rubric",
            action: "Rubrique créée",
            time: lastRubric ? lastRubric.created_at : null,
          },
          {
            title: lastMedia ? lastMedia.description : "Aucun média",
            type: "media",
            action: "Média créé",
            time: lastMedia ? lastMedia.created_at : null,
          },
          {
            title: lastAdmin ? lastAdmin.name : "Aucun administrateur",
            type: "admin",
            action: "Administrateur créé",
            time: lastAdmin ? lastAdmin.created_at : null,
          },
        ],
      },
    };
  }



  // 🟦 Vue d’un admin normal : ses propres stats
  async getAdminDashboard(adminId: string) {
    // Total d'articles créés par cet admin
    const myArticlesCount = await this.articleRepository.count({
      where: { creator: { id: adminId } },
    });

    // Dernier article qu’il a publié
    const lastMyArticle = await this.articleRepository.findOne({
      where: { creator: { id: adminId } },
      order: { created_at: 'DESC' },
      select: ['id', 'title', 'created_at'],
    });

    // Dernier média du système (utile pour affichage visuel global)
    const lastMedia = await this.mediaRepository.findOne({
      order: { created_at: 'DESC' },
      select: ['id', 'description', 'url'],
    });

    return {
      lastUpdate: new Date(),
      overview: {
        myArticles: { total: myArticlesCount, last: lastMyArticle },
        lastMedia, // tu peux le virer si tu veux une vue 100 % perso
      },
    };
  }
}
