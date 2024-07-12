import { Entity, Column, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { DATABASE_TABLES } from '../../../constants/database.enum';
import { BaseEntity } from '../../../models/BaseEntity';

@Entity({ name: DATABASE_TABLES.NOTIFICATION_TOKEN })
export class NotificationToken extends BaseEntity {
  @Column()
  userId: number;
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  @ManyToOne(() => User)
  user: User;

  @Column()
  deviceType: string;

  @Column()
  uniqueToken: string;

  @Column({
    default: 'ACTIVE',
  })
  status: string;
}
