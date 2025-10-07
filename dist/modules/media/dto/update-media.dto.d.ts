import { CreateMediaDto } from './create-media.dto';
declare const UpdateMediaDto_base: import("@nestjs/mapped-types").MappedType<Partial<Omit<CreateMediaDto, "url" | "filename" | "size" | "article_id">>>;
export declare class UpdateMediaDto extends UpdateMediaDto_base {
}
export {};
