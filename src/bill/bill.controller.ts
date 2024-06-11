import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { BillService } from './bill.service';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';

@Controller('bill')
export class BillController {
  constructor(private readonly billService: BillService) {}

  @Post()
  create(@Request() request, @Body() createBillDto: CreateBillDto) {
    return this.billService.create(request['restaurantId'], createBillDto);
  }

  @Get(':restaurantId')
  findAll(@Param('restaurantId') restaurantId: number) {
    return this.billService.findAll(+restaurantId);
  }

  @Get(':restaurantId/bills/:billId')
  findOne(@Param('restaurantId') restaurantId: number, @Param('billId') billId: string) {
    return this.billService.findOne(+restaurantId, +billId);
  }

  @Patch(':restaurantId/bills/:billId')
  update(@Param('restaurantId') restaurantId: number, @Param('billId') billId: string, @Body() updateBillDto: UpdateBillDto) {
    return this.billService.update(+restaurantId, +billId, updateBillDto);
  }

  @Delete(':restaurantId/bills/:billId')
  remove(@Param('restaurantId') restaurantId: number, @Param('billId') billId: string) {
    return this.billService.remove(+restaurantId, +billId);
  }
}
