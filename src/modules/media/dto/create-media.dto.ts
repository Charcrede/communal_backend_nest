import { IsString, MaxLength, IsEnum, IsNumber, IsUUID, IsOptional } from 'class-validator';
import { MediaType } from '../entities/media.entity';

export class CreateMediaDto {
  @IsString()
  @MaxLength(255)
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(MediaType)
  type: MediaType;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  url: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  youtubeUrl?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  filename: string;

  @IsOptional()
  @IsNumber()
  size: number;
  
  @IsOptional()
  @IsUUID()
  article_id: string;
}