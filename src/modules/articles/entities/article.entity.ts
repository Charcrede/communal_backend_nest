import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { BaseEntity } from '@/common/entities/base.entity';
import { Rubric } from '@/modules/rubrics/entities/rubric.entity';
import { Admin } from '@/modules/admins/entities/admin.entity';
import { Media } from '@/modules/media/entities/media.entity';

@Entity('articles')
export class Article extends BaseEntity {
  @Column({ length: 255 })
  title: string;

  @Column('text')
  content: string;

  @Column('uuid')
  rubric_id: string;

  @Column({ length: 255 })
  head: string;

  @Column('uuid')
  created_by: string;

  @ManyToOne(() => Rubric, (rubric) => rubric.articles)
  @JoinColumn({ name: 'rubric_id' })
  rubric: Rubric;

  @ManyToOne(() => Admin, (admin) => admin.articles)
  @JoinColumn({ name: 'created_by' })
  creator: Admin;

  @OneToMany(() => Media, (media) => media.article)
  media: Media[];
}