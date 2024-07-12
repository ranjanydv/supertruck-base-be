import { Module } from '@nestjs/common';
import { DriverScheduleService } from './driver_schedule.service';
import { DriverScheduleController } from './driver_schedule.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DriverSchedule } from './entities/driver_schedule.entity';
import { LoadModule } from '../load/load.module';
import { DriverModule } from '../driver/driver.module';

@Module({
  imports: [TypeOrmModule.forFeature([DriverSchedule]), LoadModule, DriverModule],
  controllers: [DriverScheduleController],
  providers: [DriverScheduleService],
})
export class DriverScheduleModule {}
