import { ApiProperty } from '@nestjs/swagger';
import { Driver } from 'src/modules/driver/entities/driver.entity';
import { Load } from 'src/modules/load/entities/load.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { DATABASE_TABLES } from '../../../constants/database.enum';
import { OneToOne } from 'typeorm';
export enum Status {
  PENDING = 'pending',
  INPROGRESS = 'inprogress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

@Entity({ name: DATABASE_TABLES.LOAD_ASSIGNMENTS })
export class LoadAssignment {
  @ApiProperty({ type: 'number', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  loadId: number;
  @ApiProperty({ type: () => Load })
  @ManyToOne(() => Load, (load) => load.loadAssignments)
  @JoinColumn({ name: 'loadId' })
  load: Load;

  @Column()
  driverId: number;
  @ApiProperty({ type: () => Driver })
  @ManyToOne(() => Driver, (driver) => driver.loadAssignments)
  @JoinColumn({ name: 'driverId' })
  driver: Driver;

  @ApiProperty({ type: 'string', example: Status.PENDING })
  @Column()
  status: Status;

  @ApiProperty({ type: 'string', example: '2024-06-09T12:34:56Z' })
  @Column({ type: 'timestamp', nullable: true })
  onboarding_date: Date;

  @ApiProperty({ type: 'string', example: '2024-06-10T12:34:56Z' })
  @Column({ type: 'timestamp', nullable: true })
  completion_date: Date;

  @ApiProperty({ type: 'number', example: 123 })
  @Column()
  assignedById: number;

  @ApiProperty({ type: 'number', example: 123 })
  @ManyToOne(() => User)
  @JoinColumn({ name: 'assignedById' })
  assignedBy: User;

  @ApiProperty({ type: 'string', example: 'Driver has prior experience with similar loads.' })
  @Column({ type: 'text', nullable: true })
  notes: string;

  // @ApiProperty({ type: 'json', example: '[{"name": "document1.pdf", "url": "/documents/document1.pdf"}]' })
  // @Column({ type: 'json', nullable: true })
  // documents: any;
}
