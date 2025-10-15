import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Not } from 'typeorm';
import { Article } from './entities/article.entity';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ArticleQueryDto } from './dto/article-query.dto';
import { PaginatedResult } from '@/common/dto/pagination.dto';
import { RubricsService } from '../rubrics/rubrics.service';
import { MediaService } from '../media/media.service';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private articlesRepository: Repository<Article>,
    private mediaService: MediaService,
    private rubricsService: RubricsService,
  ) {}

  async create(createArticleDto: CreateArticleDto, createdBy: string): Promise<Article> {
    // Vérifier que la rubrique existe
    await this.rubricsService.findOne(createArticleDto.rubric_id);

    const article = this.articlesRepository.create({
      ...createArticleDto,
      created_by: createdBy,
    });

    return this.articlesRepository.save(article);
  }

  async findAll(queryDto: ArticleQueryDto): Promise<PaginatedResult<Article>> {
    const { page = 1, per_page = 10, rubric, rubric_id, exclude_rubric, exclude_rubric_id, search } = queryDto;

    const queryBuilder = this.articlesRepository
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.rubric', 'rubric')
      .leftJoinAndSelect('article.creator', 'creator')
      .leftJoinAndSelect('article.media', 'media');

    // Filtrage par rubrique
    if (rubric_id) {
      queryBuilder.andWhere('article.rubric_id = :rubric_id', { rubric_id });
    } else if (rubric) {
      queryBuilder.andWhere('rubric.slug = :rubric', { rubric });
    }

    // Exclusion par rubrique
    if (exclude_rubric_id) {
      queryBuilder.andWhere('article.rubric_id != :exclude_rubric_id', { exclude_rubric_id });
    } else if (exclude_rubric) {
      queryBuilder.andWhere('rubric.slug != :exclude_rubric', { exclude_rubric });
    }

    // Recherche textuelle
    if (search) {
      queryBuilder.andWhere(
        '(article.title ILIKE :search OR article.content ILIKE :search)',
        { search: `%${search}%` }
      );
    }

    // Tri et pagination
    queryBuilder.orderBy('article.created_at', 'DESC');

    const total = await queryBuilder.getCount();
    const articles = await queryBuilder
      .skip((page - 1) * per_page)
      .take(per_page)
      .getMany();

    return {
      data: articles,
      total,
      page,
      per_page,
      total_pages: Math.ceil(total / per_page),
    };
  }

  async search(query: string, page = 1, per_page = 10): Promise<PaginatedResult<Article>> {
    const [articles, total] = await this.articlesRepository.findAndCount({
      where: [
        { title: Like(`%${query}%`) },
        { content: Like(`%${query}%`) },
      ],
      relations: ['rubric', 'creator', 'media'],
      order: { created_at: 'DESC' },
      skip: (page - 1) * per_page,
      take: per_page,
    });

    return {
      data: articles,
      total,
      page,
      per_page,
      total_pages: Math.ceil(total / per_page),
    };
  }

  async findOne(id: string): Promise<Article> {
    const article = await this.articlesRepository.findOne({
      where: { id },
      relations: ['rubric', 'creator', 'media'],
    });

    if (!article) {
      throw new NotFoundException('Article not found');
    }

    return article;
  }

  async findByRubric(rubricId: string): Promise<Article[]> {
    return this.articlesRepository.find({
      where: { rubric_id: rubricId },
      relations: ['rubric', 'creator', 'media'],
      order: { created_at: 'DESC' },
    });
  }


  async findByTitle(title: string): Promise<Article|null> {
    return this.articlesRepository.findOne({
      where: { title: title },
      relations: ['rubric', 'creator', 'media'],
    });
  }



  async update(id: string, updateArticleDto: UpdateArticleDto, userId: string): Promise<Article> {
    const article = await this.findOne(id);

    if (article.created_by !== userId) {
      throw new ForbiddenException('Vous pouvez seulement modifier vos propres articles');
    }

    if (updateArticleDto.rubric_id) {
      await this.rubricsService.findOne(updateArticleDto.rubric_id);
    }

    await this.articlesRepository.update(id, updateArticleDto);
    return this.findOne(id);
  }

  async remove(id: string, userId: string): Promise<void> {
    const article = await this.findOne(id);



    if (article.created_by !== userId) {
      throw new ForbiddenException('Vous pouvez seulement supprimer vos propres articles');
    }

    await this.mediaService.removeByArticleId(article.id);

    const result = await this.articlesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Article not found');
    }
  }
}