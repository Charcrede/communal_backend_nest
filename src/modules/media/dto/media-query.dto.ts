import { IsOptional, IsString, IsUUID } from 'class-validator';
import { PaginationDto } from '@/common/dto/pagination.dto';

export class ArticleQueryDto extends PaginationDto {
  @IsOptional()
  @IsString()
  search?: string;
  
}