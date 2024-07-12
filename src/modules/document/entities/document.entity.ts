import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, OneToOne, JoinColumn, OneToMany, ManyToOne } from 'typeorm';
import { DATABASE_TABLES } from '../../../constants/database.enum';
import { BaseEntity } from '../../../models/BaseEntity';

import { DispatcherEntity } from '../../dispatcher/entities/dispatcher.entity';
import { User } from '../../user/entities/user.entity';
import { DocumentType } from '../../dcoument-type/entities/dcoument-type.entity';

@Entity({ name: DATABASE_TABLES.DOCUEMENT })
export class Document extends BaseEntity {
  @ApiProperty({ type: 'string', example: '/path/to/document.pdf' })
  @Column({ length: 255 })
  path: string;

  @ApiProperty({ type: 'json', nullable: true })
  @Column('json', { nullable: true })
  metadata: any;

  @Column()
  userId: number;
  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.documents)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  typeId: number;
  @ApiProperty({ type: () => DocumentType })
  @OneToOne(() => DocumentType)
  @JoinColumn({ name: 'typeId' })
  type: DocumentType;
}
