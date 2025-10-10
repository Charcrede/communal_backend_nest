import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Request,
  UseInterceptors,
  UploadedFiles,
  Logger,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ArticleQueryDto } from './dto/article-query.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminRoleGuard } from '../auth/guards/admin-role.guard';
import { MediaService } from '../media/media.service';
import { MediaType } from '../media/entities/media.entity';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { promises as fs } from 'fs';
import { v2 as cloudinary } from 'cloudinary';
import { Express } from 'express';

@Controller('articles')
export class ArticlesController {
  private readonly logger = new Logger(ArticlesController.name);

  constructor(
    private readonly articlesService: ArticlesService,
    private readonly mediaService: MediaService,
  ) { }

  @Post()
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
      limits: { fileSize: 10 * 1024 * 1024 },
    }),
  )
  async create(
    @Body() createArticleDto: CreateArticleDto,
    @UploadedFiles() files: Express.Multer.File[],
    @Request() req,
  ) {
    cloudinary.config({
      cloud_name: 'deh7gkg1l',
      api_key: '113828242843515',
      api_secret: 'M7RcCpvbJGzxOGmqoY_U7r79t3M' // Click 'View API Keys' above to copy your API secret
    });
    // 1️⃣ Créer l'article
    const article = await this.articlesService.create(createArticleDto, req.user.id);

    if (files && files.length > 0) {
      for (const [i, file] of files.entries()) {
        // 2️⃣ Créer l'entité Média avec URL locale
        const media = await this.mediaService.create({
          title: file.originalname,
          description: `Média n°${i + 1} pour l'article ${article.title}`,
          type: file.mimetype.startsWith('image/')
            ? MediaType.IMAGE
            : file.mimetype.startsWith('video/')
              ? MediaType.VIDEO
              : MediaType.AUDIO,
          filename: file.filename,
          url: `/uploads/${file.filename}`, // URL locale pour le moment
          size: file.size,
          article_id: article.id,
        });

        // 3️⃣ Upload sur Cloudinary avec le nom de fichier BDD
        try {
          const filePath = join(process.cwd(), 'uploads', file.filename);
          const uploadResult = await cloudinary.uploader.upload(filePath, {
            folder: 'articles',
            resource_type: 'auto',
            public_id: media.filename.split('.')[0],
          });

          // 4️⃣ Mise à jour de l'URL Cloudinary
          await this.mediaService.updateUrl(media.id, uploadResult.secure_url);

          // 5️⃣ Supprimer le fichier local
          await fs.unlink(join(process.cwd(), 'uploads', file.filename));
        } catch (error) {
          this.logger.error(`Erreur Cloudinary pour le fichier ${file.filename}`, error);
        }
      }
    }

    return this.articlesService.findOne(article.id);
  }

  @Get()
  async findAll(@Query() queryDto: ArticleQueryDto) {
    return this.articlesService.findAll(queryDto);
  }

  @Get('search')
  search(
    @Query('search') search: string,
    @Query('page') page = 1,
    @Query('per_page') per_page = 10,
  ) {
    return this.articlesService.search(search, +page, +per_page);
  }

  @Get('by-rubric/:rubricId')
  findByRubric(@Param('rubricId') rubricId: string) {
    return this.articlesService.findByRubric(rubricId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articlesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  update(
    @Param('id') id: string,
    @Body() updateArticleDto: UpdateArticleDto,
    @Request() req,
  ) {
    return this.articlesService.update(id, updateArticleDto, req.user.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  remove(@Param('id') id: string, @Request() req) {
    return this.articlesService.remove(id, req.user.id);
  }
}
