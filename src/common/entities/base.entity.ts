import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

@CreateDateColumn({
  // type: 'timestamptz', // postgres
  type: 'datetime', // mysql
})
created_at: Date;

  @UpdateDateColumn({
    // type: 'timestamptz', // postgres
    type: 'datetime', // mysql
  })
  updated_at: Date;
}