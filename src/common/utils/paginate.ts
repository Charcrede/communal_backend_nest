// src/common/utils/paginate.ts
import { Repository } from "typeorm";
import { PaginationDto, PaginatedResult } from "../dto/pagination.dto";

export async function paginate<T>(
  repository: Repository<T>,
  paginationDto: PaginationDto,
  options: object = {}
): Promise<PaginatedResult<T>> {
  const { page, per_page } = paginationDto;

  const [data, total] = await repository.findAndCount({
    skip: (page - 1) * per_page,
    take: per_page,
    ...options, // permet de rajouter relations, where, order...
  });

  return {
    data,
    total,
    page,
    per_page,
    total_pages: Math.ceil(total / per_page),
  };
}
