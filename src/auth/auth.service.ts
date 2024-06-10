import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto, LoginOutputDto } from './dtos/login.dto';
import { OpaPersonService } from 'src/opa_person/opa_person.service';
import { EncrypterService } from 'src/shared/services/encrypter/encrypter.service';
import { JwtService } from '@nestjs/jwt';
import { Restaurant } from '../restaurant/entities/restaurant.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {

  constructor(
    @Inject('PERSON_SERVICE') private personService: OpaPersonService,
    @Inject('RESTAURANT_REPOSITORY') private restaurantRepository: Repository<Restaurant>,
    @Inject('ENCRYPTER_SERVICE') private encrypter: EncrypterService,
    private jwtService: JwtService) { }

  async login({ username, password }: LoginDto): Promise<LoginOutputDto> {
    const personAuthData = await this.personService.findByUsername(username);
    const isValidLogin = personAuthData ? await this.encrypter.compare(password, personAuthData.password) : false;
    if (!isValidLogin) {
      throw new UnauthorizedException('Usuário e/ou senha inválidos.');
    }

    const jwtToken = await this.jwtService.signAsync({
      user: personAuthData.id,
      name: personAuthData.name,
      restaurantId: personAuthData.restaurantId,
    });

    return {
      userId: personAuthData.id,
      restaurantId: personAuthData.restaurantId,
      ownerRestaurantId: personAuthData.ownerRestaurantId,
      token: jwtToken
    };
  }

}
