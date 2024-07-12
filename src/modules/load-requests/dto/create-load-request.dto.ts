import { IsEnum, IsInt, IsNumber, IsOptional } from 'class-validator';
import { REQUEST_STATUS } from '../../../constants/module-enum.enum';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateLoadRequestDto {

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({ type: Number, description: 'The ID of the load' })
  loadId?: number;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({ type: Number, description: 'The ID of the driver' })
  driverId?: number;

  @IsOptional()
  @IsEnum(REQUEST_STATUS)
  @ApiPropertyOptional({ enum: REQUEST_STATUS, description: 'The status of the request' })
  status?: REQUEST_STATUS;
}
