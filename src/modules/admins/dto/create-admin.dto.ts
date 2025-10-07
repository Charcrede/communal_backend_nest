import { IsEmail, IsString, MinLength, MaxLength, IsEnum, IsOptional } from 'class-validator';
import { AdminRole } from '../entities/admin.entity';

export class CreateAdminDto {
  @IsString()
  @MaxLength(255)
  name: string;

  @IsEmail()
  @MaxLength(255)
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsEnum(AdminRole)
  role?: AdminRole;
}