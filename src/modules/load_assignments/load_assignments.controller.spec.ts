import { Test, TestingModule } from '@nestjs/testing';
import { LoadAssignmentsController } from './load_assignments.controller';
import { LoadAssignmentsService } from './load_assignments.service';

describe('LoadAssignmentsController', () => {
  let controller: LoadAssignmentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoadAssignmentsController],
      providers: [LoadAssignmentsService],
    }).compile();

    controller = module.get<LoadAssignmentsController>(LoadAssignmentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
