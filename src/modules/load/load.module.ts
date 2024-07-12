import { Module } from '@nestjs/common';
import { LoadService } from './load.service';
import { LoadController } from './load.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Load } from './entities/load.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Load])],
  controllers: [LoadController],
  providers: [LoadService],
  exports: [LoadService],
})
export class LoadModule {}
