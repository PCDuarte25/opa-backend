export class CreateOpaPersonDto {
  username!: string;
  password!: string;
  email!: string;
  name!: string;
  gender!: string;
  cpf!: string;
  phoneNumber!: string;
  street!: string;
  neighborhood!: string;
  streetNumber!: string;
  complement!: string;
  city!: string;
  state!: string;
  cep!: string;
  birthDate!: string;
  ocuppation!: number;
  restaurantId?: number;
  ownRestaurantId?: number;
}

export class CreateOpaPersonOutputDto {
  id: number;
  name: string;
  cpf: string;
  user: {
    email: string;
    username: string;
  };
}
