import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, OneToOne } from 'typeorm';

import { User } from 'src/modules/user/entities/user.entity';
import { DriverSchedule } from 'src/modules/driver_schedule/entities/driver_schedule.entity';
import { LoadAssignment } from 'src/modules/load_assignments/entities/load_assignment.entity';
import { DATABASE_TABLES } from '../../../constants/database.enum';
import { BaseEntity } from '../../../models/BaseEntity';
import { DispatcherEntity } from '../../dispatcher/entities/dispatcher.entity';
import { LoadRequestEntity } from '../../load-requests/entities/load-request.entity';

@Entity({ name: DATABASE_TABLES.DRIVER })
export class Driver extends BaseEntity {
  @Column()
  userId: number;
  @ApiProperty({ type: () => User })
  @OneToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ApiProperty({ type: 'string', example: 'XYZ123456' })
  @Column({ nullable: true })
  license: string;

  @ApiProperty({ type: 'string', example: 'XYZ123456' })
  @Column({ nullable: true })
  vehicleType: string;

  @ApiProperty({ example: 1 })
  @Column({ nullable: true })
  vehicleCapacity: number;

  @ApiProperty({ type: 'string', example: 'XYZ123456' })
  @Column({ nullable: true })
  special_certification: string;

  @ApiProperty({ type: 'string', example: 'XYZ123456' })
  @Column({ nullable: true })
  prefered_routes: string;

  @ApiProperty({ type: 'string', example: 'XYZ123456' })
  @Column({ nullable: true })
  availability: string;

  @ApiProperty({ type: 'string', example: '27° 42\' 14.40" N' })
  @Column({ nullable: true })
  current_latitude: string;

  @ApiProperty({ type: 'string', example: '85° 18\' 32.40" E' })
  @Column({ nullable: true })
  current_longitude: string;

  @ApiProperty({ type: 'number', example: 4.5 })
  @Column('float', { nullable: true })
  rating: number;

  @Column({ nullable: true })
  specifications: string;

  @OneToMany(() => DriverSchedule, (driverSchedule) => driverSchedule.driver)
  schedules: DriverSchedule[];

  @OneToMany(() => LoadAssignment, (loadAssignment) => loadAssignment.driver)
  loadAssignments: LoadAssignment[];

  @OneToMany(() => LoadRequestEntity, loadRequest => loadRequest.driver)
  loadRequests: LoadRequestEntity[];

  @Column({ nullable: true })
  dispatcherId?: number;
  @ManyToOne(() => User)
  @JoinColumn({ name: 'dispatcherId' })
  dispatcherAssigned: DispatcherEntity;
}
