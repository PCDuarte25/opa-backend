import { Inject, Injectable } from '@nestjs/common';
import {
  CreateRestaurantDto,
  CreateRestaurantOutputDto,
} from './dtos/create-restaurant.dto';
import { Repository } from 'typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { Person } from 'src/opa_person/entities/person.entity';

@Injectable()
export class RestaurantService {
  constructor(
    @Inject('RESTAURANT_REPOSITORY')
    private restaurantRepository: Repository<Restaurant>,
    @Inject('PERSON_REPOSITORY')
    private opaPersonRepository: Repository<Person>,
  ) {}

  async create(
    createRestaurantDto: CreateRestaurantDto,
  ): Promise<CreateRestaurantOutputDto> {
    if (
      await this.restaurantRepository.findOneBy({
        cnpj: createRestaurantDto.cnpj,
      })
    ) {
      throw new Error('Já existe um restaurante com este CNPJ.');
    }
    const owner = await this.opaPersonRepository.findOneBy({
      id: createRestaurantDto.ownerId,
    });

    if (!owner) {
      throw new Error('Owner nao encontrado');
    }

    try {
      const restaurant = this.restaurantRepository.create({
        name: createRestaurantDto.name,
        segment: createRestaurantDto.segment,
        cnpj: createRestaurantDto.cnpj,
        street: createRestaurantDto.street,
        neighborhood: createRestaurantDto.neighborhood,
        streetNumber: createRestaurantDto.streetNumber,
        complement: createRestaurantDto.complement,
        city: createRestaurantDto.city,
        state: createRestaurantDto.state,
        cep: createRestaurantDto.cep,
        phoneNumber: createRestaurantDto.phoneNumber,
      });
      owner.personRestaurant = restaurant;
      owner.restaurant = restaurant;
      await this.restaurantRepository.save(restaurant);
      await this.opaPersonRepository.save(owner);

      const restaurantOutputDto: CreateRestaurantOutputDto = {
        id: restaurant.id,
        name: restaurant.name,
      };

      return restaurantOutputDto;
    } catch (e) {
      throw new Error(
        'Aconteceu algum erro ao criar o restaurante, por favor verifique os campos inseridos.',
      );
    }
  }
}
