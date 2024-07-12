import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

//
export class LoginDto {
  @ApiProperty({ type: 'string', example: 'contact@user.com.np' })
  @IsString()
  email: string;

  @ApiProperty({ type: 'string', example: 'Secret@123' })
  @IsString()
  password: string;
}
