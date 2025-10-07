import { Repository } from "typeorm";
import { PaginationDto, PaginatedResult } from "../dto/pagination.dto";
export declare function paginate<T>(repository: Repository<T>, paginationDto: PaginationDto, options?: object): Promise<PaginatedResult<T>>;
