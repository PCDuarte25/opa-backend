export class CreateOpaPersonDto {
  username!: string;
  password!: string;
  email!: string;
  name!: string;
  gender!: string;
  cpf!: string;
  phoneNumber!: string;
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
