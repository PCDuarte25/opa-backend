import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateOpaPersonDto, CreateOpaPersonOutputDto } from './dtos/create-opa_person.dto';
import { PersonCreateContract } from './opa_person.contracts';
import { EncrypterService } from 'src/shared/services/encrypter/encrypter.service';
import { OccupationEnum, Person } from './entities/person.entity';
import { User } from './entities/user.entity';
import { Restaurant } from '../restaurant/entities/restaurant.entity';
import { ValidationException } from '../utils/exceptions';
import { PersonAuthData } from './dtos/auth-data';

@Injectable()
export class OpaPersonService {

  constructor(
    @Inject('PERSON_REPOSITORY')
    private opaPersonRepository: Repository<Person>,
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    @Inject('RESTAURANT_REPOSITORY')
    private restaurantRepository: Repository<Restaurant>,
    @Inject('ENCRYPTER_SERVICE')
    private encrypterService: EncrypterService,
  ) { }

  async create(createOpaPersonDto: CreateOpaPersonDto): Promise<CreateOpaPersonOutputDto> {
    if (await this.opaPersonRepository.findOne({
      where: { cpf: createOpaPersonDto.cpf }, relations: ['user'] })) {
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
      throw new Error('Usuário já cadastrado.');
    }
    const hashedPassword = await this.encrypterService.encrypt(createOpaPersonDto.password);

    let restaurant: Restaurant;
    let ownRestaurant: Restaurant;
    if (createOpaPersonDto.restaurantId) {
      restaurant = await this.restaurantRepository.findOneBy({ id: createOpaPersonDto.restaurantId })
      if (!restaurant) {
        throw new ValidationException('Restaurante nao encontrado');
      }
    } 
     if (createOpaPersonDto.ownRestaurantId) {
      ownRestaurant = await this.restaurantRepository.findOneBy({ id: createOpaPersonDto.ownRestaurantId })
      if (!ownRestaurant) {
        throw new ValidationException('Restaurante nao encontrado');
      }
    }

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
      ocuppation: createOpaPersonDto.ocuppation ?? OccupationEnum.Adm,
      user: {
        email: createOpaPersonDto.email,
        username: createOpaPersonDto.username,
        password: hashedPassword,
      },
      ownRestaurant: ownRestaurant,
      restaurant: restaurant,
    }

    try {
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
    catch (e) {
      throw new Error('Aconteceu algum erro ao criar o usuário, por favor verifique os campos inseridos.');
    }
  }

  async findByUsername(username: string): Promise<PersonAuthData> {
    const person = await this.opaPersonRepository.query(
      `SELECT
        user.id,
        user.password,
        person.name,
        person.restaurantId
      FROM
        person
      INNER JOIN
        user ON user.id = person.user_id
      WHERE
        user.username = '${username}'
      `, []);

    return person[0] ?? null;
  }
}
