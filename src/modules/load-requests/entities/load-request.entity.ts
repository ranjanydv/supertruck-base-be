import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { DATABASE_TABLES } from '../../../constants/database.enum';
import { Load } from '../../load/entities/load.entity';
import { Driver } from '../../driver/entities/driver.entity';
import { REQUEST_STATUS } from '../../../constants/module-enum.enum';
import { BaseEntity } from '../../../models/BaseEntity';


@Entity(DATABASE_TABLES.LOAD_REQUEST)
export class LoadRequestEntity extends BaseEntity {

  @Column({ type: 'int', nullable: true })
  loadId: number;

  @ManyToOne(() => Load, (load) => load.loadRequests)
  @JoinColumn({ name: 'loadId' })
  load: Load;

  @Column({ type: 'int', nullable: true })
  driverId: number;

  @ManyToOne(() => Driver, (driver) => driver.loadRequests)
  @JoinColumn({ name: 'driverId' })
  driver: Driver;

  @Column({ type: 'varchar', default: REQUEST_STATUS.PENDING })
  status: REQUEST_STATUS;
}
