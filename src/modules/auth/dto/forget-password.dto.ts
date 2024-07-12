import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { OtpType } from '../../otp/entities/otp.entity';

//
export class ForgetPasswordDto {
  @ApiProperty({ type: 'string', example: 'hello@world.com' })
  @IsString()
  email: string;

  @ApiProperty({ type: 'string', example: OtpType.PASSWORD_RESET })
  @IsString()
  type: OtpType;
}
