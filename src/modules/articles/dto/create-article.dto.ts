import { IsNotEmpty, IsString, MaxLength, IsUUID } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  title: string;
  
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  head: string;
  
  @IsString()
  @IsNotEmpty()
  content: string;


  @IsUUID()
  @IsNotEmpty()
  rubric_id: string;
}
