import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { DATABASE_TABLES } from '../../../constants/database.enum';
import { BaseEntity } from '../../../models/BaseEntity';

@Entity({ name: DATABASE_TABLES.DOCUEMENT_TYPE })
export class DocumentType extends BaseEntity {
  @ApiProperty({ type: 'string', example: 'Invoice' })
  @Column()
  name: string;

  @ApiProperty({ type: 'string', example: 'invoice' })
  @Column({ unique: true })
  slug: string;

  @ApiProperty({ type: 'string', example: 'This is description' })
  @Column({ unique: true })
  description: string;
}
