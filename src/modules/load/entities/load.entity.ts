import { ApiProperty } from '@nestjs/swagger';
import { Broker } from 'src/modules/broker/entities/broker.entity';
import { Invoice } from 'src/modules/invoice/entities/invoice.entity';
import { LoadAssignment } from 'src/modules/load_assignments/entities/load_assignment.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { BaseEntity } from '../../../models/BaseEntity';
import { DriverSchedule } from '../../driver_schedule/entities/driver_schedule.entity';
import { LoadStatus } from '../../../constants/status.enum';
import { LoadRequestEntity } from '../../load-requests/entities/load-request.entity';

@Entity('Loads')
export class Load extends BaseEntity {
  @Column({ nullable: true })
  brokerId: number;
  @ApiProperty({ type: () => Broker })
  @ManyToOne(() => Broker, (broker) => broker.loads)
  broker: Broker;

  @ApiProperty({ example: 'this is default' })
  @Column()
  details: string;

  @ApiProperty({ type: 'number', example: 1000.0 })
  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @ApiProperty({ type: 'number', example: 4.5 })
  @Column('float', { nullable: true })
  rating: number;

  @ApiProperty({ example: LoadStatus.UNASSIGNED })
  @Column()
  status: LoadStatus;

  @OneToMany(() => Invoice, (invoice) => invoice.load)
  invoices: Invoice[];

  @OneToMany(() => LoadAssignment, (loadAssignment) => loadAssignment.load)
  loadAssignments: LoadAssignment[];

  @OneToMany(() => DriverSchedule, (driverSchedule) => driverSchedule.driver)
  schedules: DriverSchedule[];


  @OneToMany(() => LoadRequestEntity, loadRequest => loadRequest.load)
  loadRequests: LoadRequestEntity[];
}
