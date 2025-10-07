import { PaginationDto } from '@/common/dto/pagination.dto';
export declare class ArticleQueryDto extends PaginationDto {
    rubric?: string;
    rubric_id?: string;
    exclude_rubric?: string;
    exclude_rubric_id?: string;
    query?: string;
}
