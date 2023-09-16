import { Injectable } from '@nestjs/common';
import { CreateOpaPersonDto } from './dto/create-opa_person.dto';
import { UpdateOpaPersonDto } from './dto/update-opa_person.dto';
import { PersonCreateContract } from './opa_person.contracts';
import { OpaPersonRepository } from './repositories/opa_person.repository';

@Injectable()
export class OpaPersonService {

  constructor(
    private opaPersonRepository: OpaPersonRepository
  ) {}

  create(createOpaPersonDto: CreateOpaPersonDto) {
    // #TODO: Implementar validação de senha.

    const person: PersonCreateContract = {
      name: createOpaPersonDto.name,
      gender: createOpaPersonDto.gender,
      cpf: createOpaPersonDto.cpf,
      phoneNumber: createOpaPersonDto.phoneNumber,
      user: {
        email: createOpaPersonDto.email,
        username: createOpaPersonDto.username,
        password: createOpaPersonDto.password,
      }
    }

    return this.opaPersonRepository.create(person);
  }

  findAll() {
    return `This action returns all opaPerson`;
  }

  findOne(id: number) {
    return `This action returns a #${id} opaPerson`;
  }

  update(id: number, updateOpaPersonDto: UpdateOpaPersonDto) {
    return `This action updates a #${id} opaPerson`;
  }

  remove(id: number) {
    return `This action removes a #${id} opaPerson`;
  }
}