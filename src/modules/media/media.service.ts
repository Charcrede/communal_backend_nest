import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Like, Repository } from 'typeorm';
import { unlinkSync } from 'fs';
import { join } from 'path';
import { Media } from './entities/media.entity';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { Article } from '../articles/entities/article.entity';
import { PaginatedResult } from '@/common/dto/pagination.dto';

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(Media)
    private mediaRepository: Repository<Media>,
  ) { }

  async create(createMediaDto: CreateMediaDto, createdBy: string): Promise<Media> {
    const media = this.mediaRepository.create({ ...createMediaDto, created_by: createdBy });
    return this.mediaRepository.save(media);
  }

  async findAll(): Promise<Media[]> {
    return this.mediaRepository.find({
      relations: ['article'],
      order: { created_at: 'DESC' },
    });
  }

  async updateUrl(id: string, url: string): Promise<Media> {
    const media = await this.mediaRepository.findOne({ where: { id } });
    if (!media) {
      throw new NotFoundException(`Media with id ${id} not found`);
    }

    media.url = url;
    return this.mediaRepository.save(media);
  }

  async search(query: string, page = 1, per_page = 10): Promise<PaginatedResult<Media>> {
    const [medias, total] = await this.mediaRepository.findAndCount({
      where: [
        { title: Like(`%${query}%`) },
        { description: Like(`%${query}%`) },
      ],
      relations: ['creator'],
      order: { created_at: 'DESC' },
      skip: (page - 1) * per_page,
      take: per_page,
    });

    return {
      data: medias,
      total,
      page,
      per_page,
      total_pages: Math.ceil(total / per_page),
    };
  }

  async findUnlinked(page = 1, per_page = 10) {
    const [data, total] = await this.mediaRepository.findAndCount({
      where: { article: IsNull() },
      order: { created_at: 'DESC' },
      relations: ['creator'],
      skip: (page - 1) * per_page,
      take: per_page,
    });

    return {
      data,
      meta: {
        total,
        page,
        lastPage: Math.ceil(total / per_page),
      },
    };
  }


  async findOne(id: string): Promise<Media> {
    const media = await this.mediaRepository.findOne({
      where: { id },
      relations: ['article'],
    });

    if (!media) {
      throw new NotFoundException('Media not found');
    }

    return media;
  }

  async update(id: string, updateMediaDto: UpdateMediaDto): Promise<Media> {
    await this.findOne(id);
    await this.mediaRepository.update(id, updateMediaDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const media = await this.findOne(id);

    // Supprimer le fichier physique
    try {
      const filePath = join(process.cwd(), 'uploads', media.filename);
      unlinkSync(filePath);
    } catch (error) {
      console.error('Error deleting file:', error);
    }

    const result = await this.mediaRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Media not found');
    }
  }

  removeByArticleId(articleId: string): Promise<void> {
    return this.mediaRepository
      .delete({ article: { id: articleId } })
      .then(() => undefined);
  }
}