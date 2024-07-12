import { IsEnum, IsNumber, IsString } from 'class-validator';
import { OtpType } from '../entities/otp.entity';

export class ValidateOtpDto {
  @IsNumber()
  userId: number;

  @IsEnum(OtpType)
  type: OtpType;

  @IsString()
  otp: string;
}
