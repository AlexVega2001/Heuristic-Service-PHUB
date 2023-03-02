import { Test, TestingModule } from '@nestjs/testing';
import { PHubService } from './p-hub.service';

describe('PHubService', () => {
  let service: PHubService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PHubService],
    }).compile();

    service = module.get<PHubService>(PHubService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
