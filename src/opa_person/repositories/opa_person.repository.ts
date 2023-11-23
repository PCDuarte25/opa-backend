import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { PersonCreateContract } from "../opa_person.contracts";
import { User } from "../../database_config/user/entity/user.entity";
import { Person } from "../entities/opa_person.entity";

@Injectable()
export class OpaPersonRepository {
  constructor(private personRepository: Repository<Person>,
    private userRepository: Repository<User>
  ) { }

  async create(person: PersonCreateContract): Promise<Person> {

    const userEntity: User = {
      email: person.user.email,
      password: person.user.password,
      username: person.user.username,
    }

    const user = await this.userRepository.create(userEntity)

    const userCreated = await this.userRepository.save(user)

    const personEntity: Person = {
      birthDate: person.birthDate,
      cep: person.cep,
      city: person.city,
      complement: person.complement,
      cpf: person.cpf,
      gender: person.gender,
      name: person.name,
      neighborhood: person.neighborhood,
      phoneNumber: person.phoneNumber,
      state: person.state,
      street: person.street,
      streetNumber: person.streetNumber,
    }

    personEntity.user = userCreated;

    const personCreated = await this.personRepository.create(personEntity)

    return await this.userRepository.save(personCreated)
  }
}
