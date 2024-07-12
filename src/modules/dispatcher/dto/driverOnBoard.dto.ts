import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class DriverOnboardDto {
  @ApiProperty({
    description: 'Driver Id',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  driverId: number;

  @ApiProperty({
    description: 'Dispatcher Id',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  dispatcherId: number;
}
