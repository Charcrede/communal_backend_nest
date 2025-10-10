import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from '../../modules/articles/entities/article.entity';
import { Media, MediaType } from '../../modules/media/entities/media.entity';
import { Rubric } from '../../modules/rubrics/entities/rubric.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ArticleSeeder {
  private readonly logger = new Logger(ArticleSeeder.name);

  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
    @InjectRepository(Media)
    private mediaRepository: Repository<Media>,
  ) {}

  async seed(rubrics: Rubric[], userId: string) {
    const count = await this.articleRepository.count();
    if (count > 0) {
      this.logger.log('Articles déjà présents ✅');
      return;
    }

    const mediaFiles = [
      "https://res.cloudinary.com/deh7gkg1l/image/upload/v1760049733/articles/files-1760049730169-476913983.jpg",
      "https://res.cloudinary.com/deh7gkg1l/image/upload/v1760049648/articles/files-1760049645958-620652665.jpg",
      "https://res.cloudinary.com/deh7gkg1l/image/upload/v1760049648/articles/files-1760049645958-620652665.jpg",
      "https://res.cloudinary.com/deh7gkg1l/video/upload/v1760049215/articles/files-1760049199561-827404564.mp4",
    ];

    const titles = [
      'Les bienfaits de la méditation quotidienne', 'Comment cuisiner un plat marocain traditionnel', 'Les tendances mode 2025', 'Astuces pour économiser sur ses factures', 'Top 10 des destinations de voyage en été', 'L’importance de l’hydratation pour la santé', 'Le guide complet du potager bio', 'Comment bien débuter en photographie', 'Les erreurs à éviter lors d’un entretien d’embauche', 'Recette facile de pain maison', 'Les bases du développement web', 'Comment organiser un événement réussi', 'Les secrets d’un sommeil réparateur', 'Initiation au yoga pour débutants', 'La transition vers l’énergie solaire', 'Les aliments à privilégier pour la mémoire', 'Comment créer un budget mensuel efficace', 'Idées de décoration intérieure modernes', 'Les avantages du télétravail', 'Le guide du café parfait'
    ];

    for (let i = 0; i < titles.length; i++) {
      const title = titles[i];
      const rubric = rubrics[i % rubrics.length];

      const article = this.articleRepository.create({
        title,
        content: `Voici un article détaillé sur : ${title}.`,
        rubric,
        created_by: userId,
      });

      const savedArticle = await this.articleRepository.save(article);

      // Choix média aléatoire
      const fileName = mediaFiles[Math.floor(Math.random() * mediaFiles.length)];
      const extension = fileName.split('.').pop()?.toLowerCase();

      let type: MediaType = MediaType.IMAGE;
      if (['mp4', 'avi', 'mov', 'wmv'].includes(extension!)) {
        type = MediaType.VIDEO;
      }

      await this.mediaRepository.save(
        this.mediaRepository.create({
          id: uuid(),
          article_id: savedArticle.id,
          title: `Media illustrant ${title}`,
          description: `Un média pour ${title}`,
          type,
          filename: fileName,
          url: `${fileName}`,
          size: Math.floor(Math.random() * (500000 - 50000) + 50000),
        }),
      );
    }

    this.logger.log(`${titles.length} articles insérés ✅`);
  }
}
