import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto[]) {
    return await this.orderService.create(createOrderDto);
  }

  @Get(':restaurantId')
  findAll(@Param('restaurantId') restaurantId: number) {
    return this.orderService.findAll(+restaurantId);
  }

  @Get(':restaurantId/person/:personId')
  findOneOrderByPerson(@Param('restaurantId') restaurantId: number, @Param('personId') personId: number) {
    return this.orderService.findOneOrderByPerson(+restaurantId, +personId);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.orderService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
  //   return this.orderService.update(+id, updateOrderDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.orderService.remove(+id);
  // }
}
