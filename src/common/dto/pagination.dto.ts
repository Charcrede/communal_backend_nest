import { IsOptional, IsInt, Min } from "class-validator";
import { Type } from "class-transformer";

export class PaginationDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  per_page: number = 10;
}


export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}
