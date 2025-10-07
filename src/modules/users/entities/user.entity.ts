import { Entity, Column } from 'typeorm';
import { BaseEntity } from '@/common/entities/base.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column({ length: 255 })
  name: string;

  @Column({ length: 255, unique: true })
  email: string;

  @Column()
  password: string;
}