import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OtpService } from './otp.service';
import { CreateOtpDto } from './dto/create-otp.dto';
import { UpdateOtpDto } from './dto/update-otp.dto';
import { OtpType } from './entities/otp.entity';

@Controller('otp')
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  // @Post()
  // create(@Body() createOtpDto: CreateOtpDto) {
  //
  //   const userId = 1;
  //   const type = OtpType.PASSWORD_RESET;
  //   return this.otpService.createOrUpdateOtp(createOtpDto, type);
  // }

  @Get(':id/:type')
  findOne(@Param('id') type: OtpType, code: string) {
    return this.otpService.findOtp(type, code);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.otpService.deleteOtp(+id);
  }
}
