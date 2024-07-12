import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { DATABASE_TABLES } from '../../../constants/database.enum';

export enum OtpType {
  PASSWORD_RESET = 'passwordReset',
  VERIFY_EMAIL = 'verifyEmail',
  RESET = 'reset',
}

@Entity({ name: DATABASE_TABLES.OTP })
export default class Otp extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  code: string;

  @Column({ type: 'enum', enum: OtpType, default: OtpType.PASSWORD_RESET })
  type: OtpType;

  @Column({ nullable: true })
  userId: number;
  @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'userId' })
  user: User;
}
