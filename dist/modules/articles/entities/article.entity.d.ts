import { BaseEntity } from '@/common/entities/base.entity';
import { Rubric } from '@/modules/rubrics/entities/rubric.entity';
import { Admin } from '@/modules/admins/entities/admin.entity';
import { Media } from '@/modules/media/entities/media.entity';
export declare class Article extends BaseEntity {
    title: string;
    content: string;
    rubric_id: string;
    head: string;
    created_by: string;
    rubric: Rubric;
    creator: Admin;
    media: Media[];
}
