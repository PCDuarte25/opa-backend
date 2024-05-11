export class CreateRestaurantDto {
  name!: string;
  segment!: number;
  cnpj!: string;
  street!: string;
  neighborhood!: string;
  streetNumber!: string;
  complement!: string;
  city!: string;
  state!: string;
  cep!: string;
  phoneNumber!: string;
  ownerId!: number;
  employeeId!: number;
}

export class CreateRestaurantOutputDto {
  id: number;
  name: string;
}
