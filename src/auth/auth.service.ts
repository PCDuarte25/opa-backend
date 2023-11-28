import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto, LoginOutputDto } from './dtos/login.dto';
import { OpaPersonService } from 'src/opa_person/opa_person.service';
import { EncrypterService } from 'src/shared/services/encrypter/encrypter.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    @Inject('PERSON_SERVICE') private personService: OpaPersonService,
    @Inject('ENCRYPTER_SERVICE') private encrypter: EncrypterService,
    private jwtService: JwtService) { }

  async login({ username, password }: LoginDto): Promise<LoginOutputDto> {
    const person = await this.personService.findByUsername(username);
    const user = person?.user;
    const isValidLogin = user ? await this.encrypter.compare(password, user.password) : false;

    if (!isValidLogin) {
      throw new UnauthorizedException('Usuário e/ou senha inválidos.');
    }

    const jwtToken = await this.jwtService.signAsync({
      user: user.id,
      name: person.name,
    });

    return { token: jwtToken };
  }

}
