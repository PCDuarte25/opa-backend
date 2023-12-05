import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto, OrderStatus } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { Product } from '../product/entities/product.entity';
import { Table } from '../table/entities/table.entity';
import { Bill } from '../bill/entities/bill.entity';
import { Person } from '../opa_person/entities/person.entity';

@Injectable()
export class OrderService {

  constructor(
    @Inject('ORDERS_REPOSITORY')
    private ordersRepository: Repository<Order>,
    @Inject('PRODUCT_REPOSITORY')
    private productsRepository: Repository<Product>,
    @Inject('PERSON_REPOSITORY')
    private personRepository: Repository<Person>,
    @Inject('TABLE_REPOSITORY')
    private tableRepository: Repository<Table>,
    @Inject('BILL_REPOSITORY')
    private billRepository: Repository<Bill>,
  ) { }

  async create(createOrderDto: CreateOrderDto) {
    var persons: Person[] = []
    var product = await this.productsRepository.findOneBy({ id: createOrderDto.productId })

    for (var personId of createOrderDto.personIds) {
      const person = await this.personRepository.findOneBy({ id: personId })
      persons.push(person);
    }

    const table = await this.tableRepository.findOne({
      where: { id: createOrderDto.tableId },
      relations: ['waiter']
    });

    if (!table.bill) {
      const bill = await this.billRepository.save(this.billRepository.create({}));
      table.bill = bill;
    }

    const order = this.ordersRepository.create({ people: persons, totalValue: createOrderDto.totalValue, checkouted: false, product: product, status: OrderStatus.EmAndamento, table: table, bill: table.bill, responsible: table.waiter })

    return await this.ordersRepository.save(order);
  }

  async findAll(): Promise<Order[]> {
    const orders = await this.ordersRepository.find({ relations: ['table'] });
    let ordersOutput = [];
    for (const order of orders) {
      const productQuantity = await this.ordersRepository.count({
        where: { product: order.product, bill: order.bill }
      });

      let customers = [];
      for (const customer of order.people) {
        customers.push({
          id: customer.id,
          name: customer.name,
        });
      }

      const product = {
        id: order.product.id,
        name: order.product.name,
        price: order.product.price,
      }

      const checkouted = order.checkouted ? order.date : 'Não entregue';
      const tableEntity = await this.tableRepository.findOne({
        where: { id: order.table.id },
        relations: ['waiter', 'persons']
      });

      let tableCostumers = [];
      for (const tableCustomer of tableEntity.persons) {
        tableCostumers.push({
          id: tableCustomer.id,
          name: tableCustomer.name
        });
      }

      const table = {
        waiter: tableEntity.waiter.name,
        id: tableEntity.id,
        code: tableEntity.code,
        openTime: tableEntity.openedAt,
        status: tableEntity.status,
        customers: tableCostumers
      }

      ordersOutput.push({
        id: order.id,
        menuItem: product,
        customers: customers,
        table: table,
        status: order.status,
        qt: productQuantity,
        orderedTime: order.date,
        deliveredTime: checkouted,
      });
    }

    return ordersOutput;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
