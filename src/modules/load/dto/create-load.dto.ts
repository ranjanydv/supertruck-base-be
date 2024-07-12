import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsJSON, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { LoadStatus } from '../../../constants/status.enum';

export class CreateLoadDto {
  @ApiProperty({ type: Number })
  @IsNotEmpty()
  brokerId: number;

  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  details: any;

  @ApiProperty({ type: 'number', example: 1000.0 })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({ type: 'number', example: 4.5 })
  @IsOptional()
  @IsNumber()
  rating?: number;

  @ApiProperty({ example: LoadStatus.UNASSIGNED })
  @IsOptional()
  @IsEnum(LoadStatus)
  status?: LoadStatus;
}
