import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateOpaPersonDto, CreateOpaPersonOutputDto } from './dtos/create-opa_person.dto';
import { PersonCreateContract } from './opa_person.contracts';
import { EncrypterService } from 'src/shared/services/encrypter/encrypter.service';
import { Person } from './entities/person.entity';

@Injectable()
export class OpaPersonService {

  constructor(
    @Inject('PERSON_REPOSITORY')
    private opaPersonRepository: Repository<Person>,
    @Inject('ENCRYPTER_SERVICE')
    private encrypterService: EncrypterService,
  ) { }

  async create(createOpaPersonDto: CreateOpaPersonDto): Promise<CreateOpaPersonOutputDto> {
    if (await this.opaPersonRepository.findOne({ where: { cpf: createOpaPersonDto.cpf } })) {
      throw new Error('Já existe um usuário com este CPF.');
    }
    if (await this.opaPersonRepository.findOne({
      where: {
        user: {
          email: createOpaPersonDto.email,
        }
      }, relations: ['user']
    })) {
      throw new Error('Já existe um usuário com este e-mail.');
    }

    if (await this.opaPersonRepository.findOne({
      where: {
        user: {
          username: createOpaPersonDto.username,
        }
      }, relations: ['user']
    })) {
      throw new Error('Já existe um usuário com este usuário.');
    }

    const hashedPassword = await this.encrypterService.encrypt(createOpaPersonDto.password);

    const personCreate: PersonCreateContract = {
      name: createOpaPersonDto.name,
      gender: createOpaPersonDto.gender,
      cpf: createOpaPersonDto.cpf,
      phoneNumber: createOpaPersonDto.phoneNumber,
      birthDate: createOpaPersonDto.birthDate,
      cep: createOpaPersonDto.cep,
      city: createOpaPersonDto.city,
      complement: createOpaPersonDto.complement,
      neighborhood: createOpaPersonDto.neighborhood,
      state: createOpaPersonDto.state,
      street: createOpaPersonDto.street,
      streetNumber: createOpaPersonDto.streetNumber,
      ocuppation: createOpaPersonDto.ocuppation,
      user: {
        email: createOpaPersonDto.email,
        username: createOpaPersonDto.username,
        password: hashedPassword,
      }
    }

    const person = this.opaPersonRepository.create(personCreate);
    await this.opaPersonRepository.save(person);

    const personOutputDto: CreateOpaPersonOutputDto = {
      id: person.id,
      name: person.name,
      cpf: person.cpf,
      user: {
        email: person.user.email,
        username: person.user.username,
      }
    }

    return personOutputDto;
  }

  async findByUsername(username: string): Promise<Person> {
    const person = await this.opaPersonRepository.findOne({
      where: {
        user: {
          username: username,
        }
      }, relations: ['user']
    });

    return person ?? null;
  }
}
