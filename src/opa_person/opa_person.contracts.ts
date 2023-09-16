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
}
