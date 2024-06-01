import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { TableService } from './table.service';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { AuthGuard } from '../auth/auth.guard';
import { AddCustomerDto } from './dto/add-customer.dto';
import { AddWaiterDto } from './dto/add-waiter.dto';

@Controller('table')
@UseGuards(AuthGuard)
export class TableController {
  constructor(private readonly tableService: TableService) { }

  @Post()
  async create(@Request() request, @Body() createTableDto: CreateTableDto) {
    return await this.tableService.create(request['restaurantId'], createTableDto);
  }

  @Post("/add-customer")
  async addCustomer(@Body() addCustomerDto: AddCustomerDto) {
    return await this.tableService.addCustomer(addCustomerDto);
  }

  @Post("/add-waiter")
  async addWaiter(@Body() addWaiterDto: AddWaiterDto) {
    return await this.tableService.addWaiter(addWaiterDto);
  }

  @Get()
  async findAll(@Request() request) {
    return await this.tableService.findAll(request['restaurantId']);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tableService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTableDto: UpdateTableDto) {
    return this.tableService.update(+id, updateTableDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tableService.remove(+id);
  }
}
