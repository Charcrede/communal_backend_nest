import { IsString, MaxLength, IsUUID } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  @MaxLength(255)
  title: string;

  @IsString()
  content: string;

  @IsUUID()
  rubric_id: string;
}