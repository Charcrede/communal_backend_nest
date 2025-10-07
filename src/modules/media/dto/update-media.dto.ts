import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateMediaDto } from './create-media.dto';

export class UpdateMediaDto extends PartialType(
  OmitType(CreateMediaDto, ['url', 'filename', 'size', 'article_id'] as const)
) {}