import { UserType } from '../entities/user.entity';
import { IsDate, IsEmail, IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmailAlreadyExist } from '../../../validator/email.validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { IsPhoneAlreadyExist } from '../../../validator/phone.validator';
import { Type } from 'class-transformer';

export class CreateUserDto {
  @IsEmail({}, { message: 'Please enter a valid email address' })
  @IsEmailAlreadyExist({
    message: i18nValidationMessage('validation.ALREADY_EXIST'),
  })
  @ApiProperty({ example: 'contact@user.com.np' })
  readonly email!: string;

  @IsOptional()
  @IsPhoneAlreadyExist({
    message: i18nValidationMessage('validation.ALREADY_EXIST'),
  })
  @IsString()
  @ApiProperty({ example: '+977-9800000000' })
  readonly phone: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'john' })
  readonly firstName!: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'smith' })
  readonly lastName: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'smith' })
  middleName: string;

  @ApiProperty({ type: 'date', example: '1990-01-01', required: false })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  dob?: Date;

  @IsString()
  @MinLength(8)
  @ApiProperty({ minLength: 8, example: 'Secret@123' })
  readonly password!: string;

  @IsEnum(UserType)
  @ApiProperty({ example: UserType.DISPATCHER })
  readonly userType: UserType;
}
