import { Test, TestingModule } from '@nestjs/testing';
import { LoadRequestsController } from './load-requests.controller';
import { LoadRequestsService } from './load-requests.service';

describe('LoadRequestsController', () => {
  let controller: LoadRequestsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoadRequestsController],
      providers: [LoadRequestsService],
    }).compile();

    controller = module.get<LoadRequestsController>(LoadRequestsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
