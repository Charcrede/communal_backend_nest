import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '@/common/entities/base.entity';
import { Article } from '@/modules/articles/entities/article.entity';
import { Admin } from '@/modules/admins/entities/admin.entity';

export enum MediaType {
  IMAGE = 'image',
  VIDEO = 'video',
  AUDIO = 'audio',
}

@Entity('media')
export class Media extends BaseEntity {
  @Column({ length: 255 })
  title: string;

  @Column('text', { nullable: true })
  description: string;

  @Column({
    type: 'varchar',
    enum: MediaType,
  })
  type: MediaType;

  @Column({ length: 500 })
  url: string;

  @Column({ length: 500, default: null, nullable: true })
  youtubeUrl: string;

  @Column({ length: 255 })
  filename: string;

  @Column('integer')
  size: number;

  @Column('uuid',{ default: null, nullable: true})
  article_id: string;

  @Column('uuid')
  created_by: string;

  @ManyToOne(() => Admin, (admin) => admin.medias)
  @JoinColumn({ name: 'created_by' })
  creator: Admin;

  @ManyToOne(() => Article, (article) => article.media)
  @JoinColumn({ name: 'article_id' })
  article: Article;

}