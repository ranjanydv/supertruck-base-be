import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateIf } from 'class-validator';

// Enums
import { SORT_DIRECTION, DRIVER_COLUMNS, DRIVER_SCHEDULE_COLUMNS } from '../../../constants/order-by.enum';

// Basic Query DTO for Driver
class ListDriverQueryBasic {
  @ApiProperty({ type: 'number', example: 10, required: false })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  limit?: number;

  @ApiProperty({ type: 'number', example: 0, required: false })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  offset?: number;

  @ApiProperty({ type: 'string', example: 'John Doe', required: false })
  @IsString()
  @IsOptional()
  search?: string;

  @ApiProperty({ type: 'number', example: 1, required: false })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  dispatcherId?: number;

  @ValidateIf((o) => o.orderBy)
  @ApiProperty({
    description: 'The direction to sort the result by',
    type: 'enum',
    enum: SORT_DIRECTION,
    example: SORT_DIRECTION.ASC,
    required: false,
  })
  @IsEnum(SORT_DIRECTION)
  sort?: SORT_DIRECTION;
}

// Detailed Query DTO for Driver
export class ListDriverQueryDto extends ListDriverQueryBasic {
  @ApiProperty({
    description: 'The column to order the result by',
    type: 'enum',
    enum: DRIVER_COLUMNS,
    example: DRIVER_COLUMNS.LICENSE,
    required: false,
  })
  @IsOptional()
  @IsEnum(DRIVER_COLUMNS)
  orderBy?: DRIVER_COLUMNS;
}

// Query DTO for Driver Schedule
export class ListDriverScheduleQueryDto extends ListDriverQueryBasic {
  @ApiProperty({
    description: 'The column to order the result by',
    type: 'enum',
    enum: DRIVER_SCHEDULE_COLUMNS,
    example: DRIVER_SCHEDULE_COLUMNS.START_TIME,
    required: false,
  })
  @IsOptional()
  @IsEnum(DRIVER_SCHEDULE_COLUMNS)
  orderBy?: DRIVER_SCHEDULE_COLUMNS;
}

// Search DTO for Driver
export class DriverSearchDto {
  @ApiProperty({ type: 'string', example: 'John Doe', required: false })
  @IsString()
  @IsOptional()
  search?: string;

  @ApiProperty({ type: 'number', example: 1, required: true })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  dispatcherId: number;
}
