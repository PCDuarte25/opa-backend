import { Injectable } from "@nestjs/common";
import { Person } from "src/database_config/person/entity/person.entity";
import { Repository } from "typeorm";
import { PersonCreateContract } from "../opa_person.contracts";

@Injectable()
export class OpaPersonRepository {
  constructor(private typeOrm: Repository<Person>) {}

  async create(person: PersonCreateContract): Promise<Person> {
    const model = this.typeOrm.create(person)
    return await this.typeOrm.save(model)
  }
}
