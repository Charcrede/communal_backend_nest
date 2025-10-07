import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

@CreateDateColumn({
  type: 'timestamptz', // ou 'timestamp' si tu veux sans fuseau horaire
  default: () => 'CURRENT_TIMESTAMP',
})
created_at: Date;

  @UpdateDateColumn({
     type: 'timestamptz', // ou 'timestamp' si tu veux sans fuseau horaire
  default: () => 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}