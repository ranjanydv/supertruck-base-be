import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateUploadDto {
  @IsOptional()
  @ApiProperty({
    description: 'document type',
    required: false,
  })
  @IsString()
  type: string;

  @ApiProperty({
    description: 'user id',
    required: false,
  })
  @IsOptional()
  userId: number;

  @ApiProperty({
    format: 'binary',
    type: 'string',
    description: 'File',
    required: false,
  })
  @IsOptional()
  readonly file: Express.Multer.File;
}
