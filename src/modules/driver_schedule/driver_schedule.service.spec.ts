import { Test, TestingModule } from '@nestjs/testing';
import { DriverScheduleService } from './driver_schedule.service';

describe('DriverScheduleService', () => {
  let service: DriverScheduleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DriverScheduleService],
    }).compile();

    service = module.get<DriverScheduleService>(DriverScheduleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
