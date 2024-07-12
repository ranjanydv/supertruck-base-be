import { Module } from '@nestjs/common';
import { LoadRequestsService } from './load-requests.service';
import { LoadRequestsController } from './load-requests.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoadRequestEntity } from './entities/load-request.entity';
import { LoadModule } from '../load/load.module';
import { DriverModule } from '../driver/driver.module';

@Module({
  imports:[TypeOrmModule.forFeature([LoadRequestEntity]),LoadModule,DriverModule],
  controllers: [LoadRequestsController],
  providers: [LoadRequestsService]
})
export class LoadRequestsModule {}
