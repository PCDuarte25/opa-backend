import { Test, TestingModule } from '@nestjs/testing';
import { EncrypterService } from './encrypter.service';

describe('EncrypterService', () => {
  let service: EncrypterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EncrypterService],
    }).compile();

    service = module.get<EncrypterService>(EncrypterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('deve retornar uma string criptografada', async () => {
    const senhaNormal = 'oi';
    const senhaCriptografada = await service.encrypt(senhaNormal);

    expect(senhaCriptografada).not.toEqual(senhaNormal);
  });

  it('deve retornar verdadeiro quando string crua é igual a criptografada', async () => {
    const senhaNormal = 'oi';
    const senhaCriptografada = await service.encrypt(senhaNormal);
    expect (await service.compare(senhaNormal, senhaCriptografada)).toBe(true);
  });

  it('deve retornar falso quando string crua é igual a criptografada', async () => {
    const senhaNormal = 'oi';
    const senhaCriptografada = await service.encrypt(senhaNormal);
    expect (await service.compare('oie', senhaCriptografada)).toBe(false);
  });
});
