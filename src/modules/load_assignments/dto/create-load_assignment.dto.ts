import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Status } from '../entities/load_assignment.entity';

export class CreateLoadAssignmentDto {
  @ApiProperty({ type: 'number', example: 1 })
  @IsNumber()
  loadId: number;

  @ApiProperty({ type: 'number', example: 1 })
  @IsNumber()
  driverId: number;

  @ApiProperty({ type: 'string', example: Status.PENDING, enum: Status })
  @IsEnum(Status)
  @IsOptional()
  status?: Status;

  @ApiProperty({ type: 'string', example: '2024-06-09T12:34:56Z' })
  @IsDateString()
  @IsOptional()
  onboarding_date?: string;

  @ApiProperty({ type: 'string', example: '2024-06-10T12:34:56Z' })
  @IsDateString()
  @IsOptional()
  completion_date?: string;

  @ApiProperty({ type: 'number', example: 123 })
  @IsNumber()
  @IsOptional()
  assignedById?: number;

  @ApiProperty({ type: 'string', example: 'Driver has prior experience with similar loads.' })
  @IsString()
  @IsOptional()
  notes?: string;
}
