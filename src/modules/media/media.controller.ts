import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Request,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MediaService } from './media.service';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminRoleGuard } from '../auth/guards/admin-role.guard';
import { MediaType } from './entities/media.entity';
import { v2 as cloudinary } from 'cloudinary';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import * as fs from 'fs/promises';
import { ConditionalFileInterceptor } from './conditional-file.interceptor';

@Controller('medias')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  // Création média (fichier ou YouTube) – admin only
  @Post()
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  @UseInterceptors(ConditionalFileInterceptor('file'))
  async create(
    @Body() createMediaDto: CreateMediaDto,
    @UploadedFile() file: Express.Multer.File,
    @Request() req,
  ) {
    const userId = req.user.id;

    cloudinary.config({
      cloud_name: 'deh7gkg1l',
      api_key: '113828242843515',
      api_secret: 'M7RcCpvbJGzxOGmqoY_U7r79t3M',
    });

    // --- Cas lien YouTube ---
    if (createMediaDto.youtubeUrl) {
      createMediaDto.url = createMediaDto.youtubeUrl;
      createMediaDto.type = MediaType.VIDEO;
      createMediaDto.filename = `youtube-${Date.now()}.txt`;
      createMediaDto.size = 0;

      if (!createMediaDto.description) {
        createMediaDto.description = `Vidéo YouTube : ${createMediaDto.youtubeUrl}`;
      }

      const media = await this.mediaService.create(createMediaDto, userId);
      return media;
    }

    // --- Cas fichier uploadé ---
    if (!file) throw new Error('Aucun fichier fourni');

    createMediaDto.url = `/uploads/${file.filename}`;
    createMediaDto.filename = file.filename;
    createMediaDto.size = file.size;
    createMediaDto.type = file.mimetype.startsWith('image/')
      ? MediaType.IMAGE
      : file.mimetype.startsWith('video/')
      ? MediaType.VIDEO
      : MediaType.AUDIO;

    if (!createMediaDto.description) {
      createMediaDto.description = `Fichier ${file.originalname}`;
    }

    const media = await this.mediaService.create(createMediaDto, userId);

    try {
      const filePath = join(process.cwd(), 'uploads', file.filename);
      const uploadResult = await cloudinary.uploader.upload(filePath, {
        folder: 'medias',
        resource_type: 'auto',
        public_id: media.filename.split('.')[0],
      });

      await this.mediaService.updateUrl(media.id, uploadResult.secure_url);
      await fs.unlink(filePath);
    } catch (error) {
      console.error(`Erreur Cloudinary pour le fichier ${file.filename}`, error);
    }

    return this.mediaService.findOne(media.id);
  }

  // --- Méthodes publiques ---
  @Get('unlinked')
  async findUnlinked(
    @Query('page') page = 1,
    @Query('per_page') per_page = 10,
  ) {
    return this.mediaService.findUnlinked(Number(page), Number(per_page));
  }

  @Get('search')
  async search(
    @Query('search') search: string,
    @Query('page') page = 1,
    @Query('per_page') perPage = 10,
  ) {
    return this.mediaService.search(search, Number(page), Number(perPage));
  }

  // --- Méthodes admin (protégées) ---
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  @Get()
  findAll() {
    return this.mediaService.findAll();
  }

  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mediaService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMediaDto: UpdateMediaDto) {
    return this.mediaService.update(id, updateMediaDto);
  }

  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mediaService.remove(id);
  }
}
