import { Test, TestingModule } from '@nestjs/testing';
import { OpaPersonService } from './opa_person.service';

describe('OpaPersonService', () => {
  let service: OpaPersonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OpaPersonService],
    }).compile();

    service = module.get<OpaPersonService>(OpaPersonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
