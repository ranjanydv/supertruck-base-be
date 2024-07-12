import { Module } from '@nestjs/common';
import { OtpService } from './otp.service';
import { OtpController } from './otp.controller';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import Otp from './entities/otp.entity';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([User, Otp])],
  controllers: [OtpController],
  providers: [OtpService],
  exports: [OtpService],
})
export class OtpModule {}
