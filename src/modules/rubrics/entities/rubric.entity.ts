import { Entity, Column, OneToMany, BeforeInsert, BeforeUpdate } from 'typeorm';
import slugify from 'slugify';
import { BaseEntity } from '@/common/entities/base.entity';
import { Article } from '@/modules/articles/entities/article.entity';

@Entity('rubrics')
export class Rubric extends BaseEntity {
  @Column({ length: 255 })
  name: string;

  @Column({ length: 255, unique: true })
  slug: string;

  @Column('text', { nullable: true })
  description: string;

  @OneToMany(() => Article, (article) => article.rubric)
  articles: Article[];

  @BeforeInsert()
  @BeforeUpdate()
  generateSlug() {
    if (this.name) {
      this.slug = slugify(this.name, { lower: true, strict: true });
    }
  }
} 