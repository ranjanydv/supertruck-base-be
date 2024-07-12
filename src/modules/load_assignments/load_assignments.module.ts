import { Module } from '@nestjs/common';
import { LoadAssignmentsService } from './load_assignments.service';
import { LoadAssignmentsController } from './load_assignments.controller';
import { LoadAssignment } from './entities/load_assignment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoadModule } from '../load/load.module';
import { DriverModule } from '../driver/driver.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([LoadAssignment]), LoadModule, DriverModule, UserModule],
  controllers: [LoadAssignmentsController],
  providers: [LoadAssignmentsService],
})
export class LoadAssignmentsModule {}
