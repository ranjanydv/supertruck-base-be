import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/modules/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { DATABASE_TABLES } from '../../../constants/database.enum';
import { BaseEntity } from '../../../models/BaseEntity';

@Entity({ name: DATABASE_TABLES.COMMUNICATIONS })
export class Communication extends BaseEntity {
  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.communicationsSent)
  user1: User;

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.communicationsReceived)
  user2: User;

  @ApiProperty({ type: 'string', example: 'Hello, how are you?' })
  @Column('text')
  message: string;

  @ApiProperty({ type: 'string', example: '2024-06-09T12:34:56Z' })
  @CreateDateColumn()
  timestamp: Date;
}
