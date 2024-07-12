import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsNumber, IsLatitude, IsLongitude, IsDate } from 'class-validator';

export class CreateDriverDto {
  @ApiProperty({ example: 'John', required: false })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiProperty({ example: 'Doe', required: false })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty({ example: 'Smith', required: false })
  @IsOptional()
  @IsString()
  middleName?: string;

  @ApiProperty({ type: 'date', example: '1990-01-01', required: false })
  @IsOptional()
  dob?: Date;

  @ApiProperty({ type: 'string', example: 'XYZ123456', required: false })
  @IsOptional()
  @IsString()
  license?: string;

  @ApiProperty({ type: 'string', example: 'SUV', required: false })
  @IsOptional()
  @IsString()
  vehicleType?: string;

  @ApiProperty({ example: 10, required: false })
  @IsOptional()
  @IsNumber()
  vehicleCapacity?: number;

  @ApiProperty({ type: 'string', example: 'HAZMAT', required: false })
  @IsOptional()
  @IsString()
  special_certification?: string;

  @ApiProperty({ type: 'string', example: 'Route 66', required: false })
  @IsOptional()
  @IsString()
  prefered_routes?: string;

  @ApiProperty({ type: 'string', example: 'Weekdays', required: false })
  @IsOptional()
  @IsString()
  availability?: string;

  @ApiProperty({ type: 'string', example: '27° 42\' 14.40" N', required: false })
  @IsOptional()
  current_latitude?: string;

  @ApiProperty({ type: 'string', example: '85° 18\' 32.40" E', required: false })
  @IsOptional()
  current_longitude?: string;

  @ApiProperty({ type: 'number', example: 4.5, required: false })
  @IsOptional()
  @IsNumber()
  rating?: number;

  @ApiProperty({ required: false, example: 'specifications' })
  @IsOptional()
  specifications?: string;

  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @IsNumber()
  dispatcherId?: number;
}
