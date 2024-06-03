export type LoginDto = {
  username: string;
  password: string;
}

export type LoginOutputDto = {
  userId: number;
  token: string;
}
