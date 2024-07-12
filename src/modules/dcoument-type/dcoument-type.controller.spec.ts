import { Test, TestingModule } from '@nestjs/testing';
import { DcoumentTypeController } from './dcoument-type.controller';
import { DcoumentTypeService } from './dcoument-type.service';

describe('DcoumentTypeController', () => {
  let controller: DcoumentTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DcoumentTypeController],
      providers: [DcoumentTypeService],
    }).compile();

    controller = module.get<DcoumentTypeController>(DcoumentTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
