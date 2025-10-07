export declare class PaginationDto {
    page: number;
    per_page: number;
}
export interface PaginatedResult<T> {
    data: T[];
    total: number;
    page: number;
    per_page: number;
    total_pages: number;
}
