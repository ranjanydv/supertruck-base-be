import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IsEmailAlreadyExist, IsEmailAlreadyExistConstraint } from '../../validator/email.validator';
import { IsPhoneAlreadyExistConstraint } from '../../validator/phone.validator';
import { Driver } from '../driver/entities/driver.entity';
import { DispatcherEntity } from '../dispatcher/entities/dispatcher.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Driver, DispatcherEntity])],
  controllers: [UserController],
  providers: [UserService, IsEmailAlreadyExistConstraint, IsPhoneAlreadyExistConstraint],
  exports: [UserService],
})
export class UserModule {}
