import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/modules/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { DATABASE_TABLES } from '../../../constants/database.enum';
import { BaseEntity } from '../../../models/BaseEntity';
import { Driver } from '../../driver/entities/driver.entity';

@Entity({ name: DATABASE_TABLES.DISPACTHER })
export class DispatcherEntity extends BaseEntity {
  @Column()
  userId: number;
  @ApiProperty({ type: () => User })
  @OneToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(() => Driver, (driver) => driver.dispatcherAssigned)
  drivers: Driver[];
}
