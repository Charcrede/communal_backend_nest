import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { unlinkSync } from 'fs';
import { join } from 'path';
import { Media } from './entities/media.entity';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(Media)
    private mediaRepository: Repository<Media>,
  ) {}

  async create(createMediaDto: CreateMediaDto): Promise<Media> {
    const media = this.mediaRepository.create(createMediaDto);
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
}