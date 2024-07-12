import { Test, TestingModule } from '@nestjs/testing';
import { DcoumentTypeService } from './dcoument-type.service';

describe('DcoumentTypeService', () => {
  let service: DcoumentTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DcoumentTypeService],
    }).compile();

    service = module.get<DcoumentTypeService>(DcoumentTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
