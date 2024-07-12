import { ApiProperty } from '@nestjs/swagger';

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../models/BaseEntity';
import { Load } from '../../load/entities/load.entity';

@Entity('Invoices')
export class Invoice extends BaseEntity {
  @ApiProperty({ type: () => Load })
  @ManyToOne(() => Load, (load) => load.invoices)
  load: Load;

  @ApiProperty({ type: 'number', example: 1234.56 })
  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @ApiProperty({ type: 'string', example: '2024-06-09' })
  @Column('date')
  issued_date: string;

  @ApiProperty({ type: 'string', example: '2024-07-09' })
  @Column('date')
  due_date: string;

  @ApiProperty({ type: 'string', example: 'paid' })
  @Column({ length: 50, nullable: true })
  status: string;
}
