import { Test, TestingModule } from '@nestjs/testing';
import { LoadRequestsService } from './load-requests.service';

describe('LoadRequestsService', () => {
  let service: LoadRequestsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoadRequestsService],
    }).compile();

    service = module.get<LoadRequestsService>(LoadRequestsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
