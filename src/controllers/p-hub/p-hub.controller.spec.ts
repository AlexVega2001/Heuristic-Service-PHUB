import { Test, TestingModule } from '@nestjs/testing';
import { PHubController } from './p-hub.controller';

describe('PHubController', () => {
  let controller: PHubController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PHubController],
    }).compile();

    controller = module.get<PHubController>(PHubController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
