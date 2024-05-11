import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { PersonCreateContract } from "../opa_person.contracts";
import { User } from "../entities/user.entity";
import { Person } from "../entities/person.entity";

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
    const user = this.userRepository.create(userEntity)
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
      ocuppation: person.ocuppation,
      restaurant: person.restaurant,
    }

    personEntity.user = userCreated;
    const personCreated = this.personRepository.create(personEntity)

    return await this.userRepository.save(personCreated)
  }
}
