import { Inject, Injectable } from '@nestjs/common';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
import { Repository } from 'typeorm';
import { Bill } from './entities/bill.entity';
import { PayedBills } from './dto/payed-bills.dto';

@Injectable()
export class BillService {

  constructor(
    @Inject('BILL_REPOSITORY')
    private billRepository: Repository<Bill>,
  ) { }

  create(restaurantId: number, createBillDto: CreateBillDto) {
    return 'This action adds a new bill';
  }

  async findAll(restaurantId: number) {
    const bills = await this.billRepository.find({
      where: {
        orders: {
          status: 1,
          restaurant: { id: restaurantId },
        }
      }, relations: ['orders']
    });

    let billsOutput: PayedBills[] = [];
    for (const bill of bills) {
      for (const order of bill.orders) {

        let personInfos = [];
        for (const person of order.people) {
          personInfos.push({
            id: person.id,
            neighborhood: person.neighborhood,
            gender: person.gender,
            birthDate: person.birthDate,
          });
        }

        billsOutput.push({
          totalValue: Number(order.totalValue),
          monthDate: order.date.getMonth(),
          productName: order.product.name,
          personInfos: personInfos,
        });
      }
    }

    return billsOutput;
  }

  findOne(id: number) {
    return `This action returns a #${id} bill`;
  }

  update(id: number, updateBillDto: UpdateBillDto) {
    return `This action updates a #${id} bill`;
  }

  remove(id: number) {
    return `This action removes a #${id} bill`;
  }
}
