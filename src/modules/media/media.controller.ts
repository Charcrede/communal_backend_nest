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
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MediaService } from './media.service';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminRoleGuard } from '../auth/guards/admin-role.guard';
import { MediaType } from './entities/media.entity';

@Controller('media')
@UseGuards(JwtAuthGuard, AdminRoleGuard)
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Body() createMediaDto: CreateMediaDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      createMediaDto.url = `/uploads/${file.filename}`;
      createMediaDto.filename = file.filename;
      createMediaDto.size = file.size;
      createMediaDto.type = file.mimetype.startsWith('image/') ? MediaType.IMAGE : 
                            file.mimetype.startsWith('video/') ? MediaType.VIDEO : MediaType.AUDIO;
    }
    
    return this.mediaService.create(createMediaDto);
  }

  @Get()
  findAll() {
    return this.mediaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mediaService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMediaDto: UpdateMediaDto) {
    return this.mediaService.update(id, updateMediaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mediaService.remove(id);
  }
}