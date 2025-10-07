"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginate = paginate;
async function paginate(repository, paginationDto, options = {}) {
    const { page, per_page } = paginationDto;
    const [data, total] = await repository.findAndCount({
        skip: (page - 1) * per_page,
        take: per_page,
        ...options,
    });
    return {
        data,
        total,
        page,
        per_page,
        total_pages: Math.ceil(total / per_page),
    };
}
//# sourceMappingURL=paginate.js.map