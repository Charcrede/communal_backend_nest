import { IsString, MaxLength, IsEnum, IsNumber, IsUUID, IsOptional } from 'class-validator';
import { MediaType } from '../entities/media.entity';

export class CreateMediaDto {
  @IsString()
  @MaxLength(255)
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(MediaType)
  type: MediaType;

  @IsString()
  @MaxLength(500)
  url: string;

  @IsString()
  @MaxLength(255)
  filename: string;

  @IsNumber()
  size: number;

  @IsUUID()
  article_id: string;
}