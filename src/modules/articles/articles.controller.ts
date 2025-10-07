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
import { PaginationDto } from '@/common/dto/pagination.dto';
import { Article } from './entities/article.entity';
import { diskStorage } from 'multer';
import { extname } from 'path';


@Controller('articles')
export class ArticlesController {
  constructor(
    private readonly articlesService: ArticlesService,
    private readonly mediaService: MediaService,
  ) { }

  @Post()
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  @UseInterceptors(FilesInterceptor('files', 10, {
    storage: diskStorage({
      destination: './uploads', // dossier de stockage
      filename: (req, file, callback) => {
        // Génère un nom unique
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
      },
    }),
  }))
  async create(
    @Body() createArticleDto: CreateArticleDto,
    @UploadedFiles() files: Express.Multer.File[],
    @Request() req,
  ) {
    const article = await this.articlesService.create(createArticleDto, req.user.id);

    // Traiter les fichiers uploadés
    if (files && files.length > 0) {
      for (const file of files) {
        await this.mediaService.create({
          title: file.originalname,
          description: '',
          type: file.mimetype.startsWith('image/')
            ? MediaType.IMAGE
            : file.mimetype.startsWith('video/')
              ? MediaType.VIDEO
              : MediaType.AUDIO,
          filename: file.filename, // grâce à diskStorage, maintenant existe
          url: `/uploads/${file.filename}`, // lien relatif à ton back
          size: file.size,
          article_id: article.id,
        });
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
    @Query('query') query: string,
    @Query('page') page = 1,
    @Query('per_page') per_page = 10,
  ) {
    return this.articlesService.search(query, +page, +per_page);
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