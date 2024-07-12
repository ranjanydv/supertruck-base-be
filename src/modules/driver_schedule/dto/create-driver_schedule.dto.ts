import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty } from 'class-validator';

export class CreateDriverScheduleDto {
  @ApiProperty({ type: Number })
  @IsNotEmpty()
  driverId: number;

  @ApiProperty({ type: Number })
  @IsNotEmpty()
  loadId: number;

  @ApiProperty({ type: 'string', format: 'date-time', example: '2024-06-09T08:00:00Z' })
  @IsNotEmpty()
  @IsDateString()
  start: Date;

  @ApiProperty({ type: 'string', format: 'date-time', example: '2024-06-09T18:00:00Z' })
  @IsNotEmpty()
  @IsDateString()
  end: Date;
}
