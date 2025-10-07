import { IsString, MaxLength, IsOptional } from 'class-validator';

export class CreateRubricDto {
  @IsString()
  @MaxLength(255)
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}