import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateBrokerDto {
  @ApiProperty({ type: 'string', example: 'ACME Corp' })
  @IsString()
  company_name: string;

  @ApiProperty({ type: 'number', example: 4.5 })
  @IsNumber()
  @IsOptional()
  rating: number;
}
