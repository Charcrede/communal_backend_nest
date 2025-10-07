import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Admin } from './entities/admin.entity';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(Admin)
    private adminsRepository: Repository<Admin>,
  ) {}

  async create(createAdminDto: CreateAdminDto): Promise<Admin> {
    const existingAdmin = await this.adminsRepository.findOne({
      where: { email: createAdminDto.email },
    });

    if (existingAdmin) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(createAdminDto.password, 10);

    const admin = this.adminsRepository.create({
      ...createAdminDto,
      password: hashedPassword,
    });

    return this.adminsRepository.save(admin);
  }

  async findAll(): Promise<Admin[]> {
    return this.adminsRepository.find({
      relations: ['articles'],
    });
  }

  async findOne(id: string): Promise<Admin> {
    const admin = await this.adminsRepository.findOne({
      where: { id },
      relations: ['articles'],
    });
    if (!admin) {
      throw new NotFoundException('Admin not found');
    }
    return admin;
  }

  async findByEmail(email: string): Promise<Admin | null> {
    return this.adminsRepository.findOne({ where: { email } });
  }

  async update(id: string, updateAdminDto: UpdateAdminDto): Promise<Admin> {
    const admin = await this.findOne(id);

    if (updateAdminDto.email && updateAdminDto.email !== admin.email) {
      const existingAdmin = await this.adminsRepository.findOne({
        where: { email: updateAdminDto.email },
      });
      if (existingAdmin) {
        throw new ConflictException('Email already exists');
      }
    }

    if (updateAdminDto.password) {
      updateAdminDto.password = await bcrypt.hash(updateAdminDto.password, 10);
    }

    await this.adminsRepository.update(id, updateAdminDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const result = await this.adminsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Admin not found');
    }
  }
}