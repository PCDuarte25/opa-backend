import { Restaurant } from "src/restaurant/entities/restaurant.entity";

export interface UserCreateContract {
  email: string;
  username: string;
  password: string;
}

export interface PersonCreateContract {
  name: string;
  gender: string;
  cpf: string;
  phoneNumber: string;
  user: UserCreateContract;
  street: string;
  neighborhood: string;
  streetNumber: string;
  complement: string;
  city: string;
  state: string;
  cep: string;
  birthDate: string;
  ocuppation: number;
  restaurant?: Restaurant[];

}
