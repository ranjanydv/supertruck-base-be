import { Module } from '@nestjs/common';
import { DcoumentTypeService } from './dcoument-type.service';
import { DcoumentTypeController } from './dcoument-type.controller';

@Module({
  controllers: [DcoumentTypeController],
  providers: [DcoumentTypeService],
})
export class DcoumentTypeModule {}
