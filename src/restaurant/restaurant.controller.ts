import { Body, Controller, HttpCode, HttpStatus, Post, Response } from '@nestjs/common';
import { CreateRestaurantDto } from './dtos/create-restaurant.dto';
import { RestaurantService } from './restaurant.service';

@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() CreateRestaurantDto: CreateRestaurantDto, @Response() res) {
    try {
      const restaurant = await this.restaurantService.create(CreateRestaurantDto);
      return res.json({
        message: 'Restaurante criado com sucesso!',
        data: restaurant,
      })

    } catch (e) {
      return await res.status(400).json({
        message: e.message,
      });
    }
  }
}
