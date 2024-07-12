import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, OneToOne } from 'typeorm';

import { User } from 'src/modules/user/entities/user.entity';
import { DriverSchedule } from 'src/modules/driver_schedule/entities/driver_schedule.entity';
import { LoadAssignment } from 'src/modules/load_assignments/entities/load_assignment.entity';
import { DATABASE_TABLES } from '../../../constants/database.enum';
import { BaseEntity } from '../../../models/BaseEntity';
import { DispatcherEntity } from '../../dispatcher/entities/dispatcher.entity';

@Entity({ name: DATABASE_TABLES.DRIVER_LOG })
export class Driver extends BaseEntity {
  @ApiProperty({ type: 'string', example: 'XYZ123456' })
  @Column({ nullable: true })
  license: string;

  @ApiProperty({ type: 'number', example: 4.5 })
  @Column('float', { nullable: true })
  rating: number;

  @ApiProperty({ type: 'json', nullable: true })
  @Column('json', { nullable: true })
  documents: any;

  @ApiProperty({ type: 'json', nullable: true })
  @Column('json', { nullable: true })
  specifications: any;

  @OneToMany(() => DriverSchedule, (driverSchedule) => driverSchedule.driver)
  schedules: DriverSchedule[];

  @OneToMany(() => LoadAssignment, (loadAssignment) => loadAssignment.driver)
  loadAssignments: LoadAssignment[];

  @Column({ nullable: true })
  dispatcherId?: number;
  @OneToOne(() => User)
  @JoinColumn({ name: 'dispatcherId' })
  dispatcherAssigned: DispatcherEntity;
}
