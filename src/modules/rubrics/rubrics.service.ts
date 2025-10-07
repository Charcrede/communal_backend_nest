import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rubric } from './entities/rubric.entity';
import { CreateRubricDto } from './dto/create-rubric.dto';
import { UpdateRubricDto } from './dto/update-rubric.dto';
import { Logger } from '@nestjs/common';

@Injectable()
export class RubricsService {
  private readonly logger = new Logger(RubricsService.name);
  constructor(
    @InjectRepository(Rubric)
    private rubricsRepository: Repository<Rubric>,
  ) {}

  async create(createRubricDto: CreateRubricDto): Promise<Rubric> {
    const rubric = this.rubricsRepository.create(createRubricDto);
    this.logger.log("je suis arrivé ici")
    try {
      return await this.rubricsRepository.save(rubric);
    } catch (error) {
      if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
        throw new ConflictException('Rubric with this name already exists');
      }
      throw error;
    }
  }

  async findAll(): Promise<Rubric[]> {
    return this.rubricsRepository.find({
      relations: ['articles', 'articles.creator', 'articles.media'],
      order: { created_at: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Rubric> {
    const rubric = await this.rubricsRepository.findOne({
      where: { id },
      relations: ['articles', 'articles.creator', 'articles.media'],
    });
    
    if (!rubric) {
      throw new NotFoundException('Rubric not found');
    }
    
    return rubric;
  }

  async update(id: string, updateRubricDto: UpdateRubricDto): Promise<Rubric> {
    const rubric = await this.findOne(id);
    
    Object.assign(rubric, updateRubricDto);
    
    try {
      return await this.rubricsRepository.save(rubric);
    } catch (error) {
      if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
        throw new ConflictException('Rubric with this name already exists');
      }
      throw error;
    }
  }

  async remove(id: string): Promise<void> {
    const result = await this.rubricsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Rubric not found');
    }
  }
}