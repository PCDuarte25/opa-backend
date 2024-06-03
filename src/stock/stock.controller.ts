import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Request } from '@nestjs/common';
import { StockService } from './stock.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('stock')
@UseGuards(AuthGuard)
export class StockController {
  constructor(private readonly stockService: StockService) { }

  @Post()
  async create(@Request() request: number, @Body() createStockDto: CreateStockDto[]) {
    return await this.stockService.create(request['restaurantId'], createStockDto);
  }

  @Get()
  async findAll(@Request() request, @Query('name') name: string) {
    return await this.stockService.findAll(request['restaurantId'], name);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.stockService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStockDto: UpdateStockDto) {
    return this.stockService.update(+id, updateStockDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stockService.remove(+id);
  }
}
