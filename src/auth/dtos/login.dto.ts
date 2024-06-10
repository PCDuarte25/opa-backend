export type LoginDto = {
  username: string;
  password: string;
}

export type LoginOutputDto = {
  userId: number;
  restaurantId: number;
  ownerRestaurantId: number;
  token: string;
}
