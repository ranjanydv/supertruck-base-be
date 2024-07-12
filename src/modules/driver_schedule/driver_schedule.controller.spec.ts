import { Test, TestingModule } from '@nestjs/testing';
import { DriverScheduleController } from './driver_schedule.controller';
import { DriverScheduleService } from './driver_schedule.service';

describe('DriverScheduleController', () => {
  let controller: DriverScheduleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DriverScheduleController],
      providers: [DriverScheduleService],
    }).compile();

    controller = module.get<DriverScheduleController>(DriverScheduleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
