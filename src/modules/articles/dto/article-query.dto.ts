import { IsOptional, IsString, IsUUID } from 'class-validator';
import { PaginationDto } from '@/common/dto/pagination.dto';

export class ArticleQueryDto extends PaginationDto {
  @IsOptional()
  @IsString()
  rubric?: string;

  @IsOptional()
  @IsUUID()
  rubric_id?: string;

  @IsOptional()
  @IsString()
  exclude_rubric?: string;

  @IsOptional()
  @IsUUID()
  exclude_rubric_id?: string;

  @IsOptional()
  @IsString()
  search?: string;
}