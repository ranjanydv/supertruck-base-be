import { ApiProperty } from '@nestjs/swagger';
import { Load } from 'src/modules/load/entities/load.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { DATABASE_TABLES } from '../../../constants/database.enum';
import { BaseEntity } from '../../../models/BaseEntity';

@Entity({ name: DATABASE_TABLES.BROKER })
export class Broker extends BaseEntity {
  // TODO: this might be userd for future
  // @ApiProperty({ type: () => User })
  // @ManyToOne(() => User, user => user.brokers)
  // user: User;

  @ApiProperty({ type: 'string', example: 'ACME Corp' })
  @Column({ length: 100, nullable: true })
  company_name: string;

  @ApiProperty({ type: 'number', example: 4.5 })
  @Column('float', { nullable: true })
  rating: number;

  @OneToMany(() => Load, (load) => load.broker)
  loads: Load[];
}
