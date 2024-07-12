import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm';

import { Broker } from 'src/modules/broker/entities/broker.entity';
import { Communication } from 'src/modules/communication/entities/communication.entity';
import { Driver } from 'src/modules/driver/entities/driver.entity';
import { AuthRoleEntity } from '../../roles/entities/role.entity';
import { BaseEntity } from '../../../models/BaseEntity';
import { DATABASE_TABLES } from '../../../constants/database.enum';

import { Document } from '../../document/entities/document.entity';

export enum UserType {
  DISPATCHER = 'dispatcher',
  DRIVER = 'driver',
  ADMIN = 'admin',
}

@Entity({ name: DATABASE_TABLES.USERS })
export class User extends BaseEntity {
  @ApiProperty({ type: 'string', example: 'john.doe@example.com' })
  @Column({ length: 100, unique: true })
  email: string;

  @ApiProperty({ type: 'string', example: '+977-9800000000' })
  @Column({ length: 15, unique: true, nullable: true })
  phone: string;

  @ApiProperty({ type: 'string', example: 'John' })
  @Column({ length: 100, nullable: true })
  firstName: string;

  @ApiProperty({ type: 'string', example: 'Doe' })
  @Column({ length: 100, nullable: true })
  lastName: string;

  @ApiProperty({ type: 'date', example: '1990-01-01' })
  @Column({ type: 'date', nullable: true })
  dob: Date;

  @ApiProperty({ type: 'string', example: 'Smith' })
  @Column({ length: 100, nullable: true })
  middleName: string;

  @ApiProperty({ type: 'string' })
  @Column()
  password: string;

  @OneToMany(() => Driver, (driver) => driver.user)
  drivers: Driver[];

  // @OneToMany(() => Broker, broker => broker.user)
  // brokers: Broker[];

  @OneToMany(() => Communication, (communication) => communication.user1)
  communicationsSent: Communication[];

  @OneToMany(() => Communication, (communication) => communication.user2)
  communicationsReceived: Communication[];

  @OneToMany(() => Document, (document) => document.user)
  documents: Document[];

  @ApiProperty({ enum: UserType })
  @Column({ type: 'varchar' })
  userType: UserType;

  @Column({ nullable: true })
  roleId?: number;

  @OneToOne(() => AuthRoleEntity)
  @JoinColumn({ name: 'roleId' })
  role: AuthRoleEntity;
}
