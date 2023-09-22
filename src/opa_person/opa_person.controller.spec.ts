import { Test, TestingModule } from '@nestjs/testing';
import { OpaPersonController } from './opa_person.controller';
import { OpaPersonService } from './opa_person.service';

describe('OpaPersonController', () => {
  let controller: OpaPersonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OpaPersonController],
      providers: [OpaPersonService],
    }).compile();

    controller = module.get<OpaPersonController>(OpaPersonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
