import { ApiProperty } from '@nestjs/swagger';
import { Driver } from 'src/modules/driver/entities/driver.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../models/BaseEntity';
import { Load } from '../../load/entities/load.entity';

@Entity('DriverSchedules')
export class DriverSchedule extends BaseEntity {
  @Column()
  driverId: number;
  @ApiProperty({ type: () => Driver })
  @ManyToOne(() => Driver, (driver) => driver.schedules)
  @JoinColumn({ name: 'driverId' })
  driver: Driver;

  @Column()
  loadId: number;
  @ApiProperty({ type: () => Load })
  @ManyToOne(() => Load, (load) => load.schedules)
  @JoinColumn({ name: 'loadId' })
  load: Load;

  @ApiProperty({ type: 'string', example: '2024-06-09T08:00:00Z' })
  @Column('timestamp')
  start: Date;

  @ApiProperty({ type: 'string', example: '2024-06-09T18:00:00Z' })
  @Column('timestamp')
  end: Date;
}
