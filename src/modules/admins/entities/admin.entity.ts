import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '@/common/entities/base.entity';
import { Article } from '@/modules/articles/entities/article.entity';

export enum AdminRole {
  ADMIN = 'admin',
  SUPER_ADMIN = 'super_admin',
}

@Entity('admins')
export class Admin extends BaseEntity {
  @Column({ length: 255 })
  name: string;

  @Column({ length: 255, unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'varchar',
    enum: AdminRole,
    default: AdminRole.ADMIN,
  })
  role: AdminRole;

  @OneToMany(() => Article, (article) => article.creator)
  articles: Article[];

  isAdmin(): boolean {
    return this.role === AdminRole.ADMIN || this.role === AdminRole.SUPER_ADMIN;
  }

  isSuperAdmin(): boolean {
    return this.role === AdminRole.SUPER_ADMIN;
  }
}