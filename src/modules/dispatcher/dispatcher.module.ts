import { Module } from '@nestjs/common';
import { DispatcherService } from './dispatcher.service';
import { DispatcherController } from './dispatcher.controller';
import { DriverModule } from '../driver/driver.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Driver } from '../driver/entities/driver.entity';
import { DispatcherEntity } from './entities/dispatcher.entity';

@Module({
  imports: [DriverModule, TypeOrmModule.forFeature([Driver, DispatcherEntity])],
  controllers: [DispatcherController],
  providers: [DispatcherService],
  exports: [DispatcherService],
})
export class DispatcherModule {}
