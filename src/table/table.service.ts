import { Inject, Injectable } from '@nestjs/common';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { Repository } from 'typeorm';
import { Table } from './entities/table.entity';
import { ValidationException } from '../utils/exceptions';
import { CodigoMesaJaExistente } from '../messages/exceptions.messages';
import { AddCustomerDto } from './dto/add-customer.dto';
import { AddWaiterDto } from './dto/add-waiter.dto';
import { Person } from 'src/opa_person/entities/person.entity';
import { Order } from 'src/order/entities/order.entity';

@Injectable()
export class TableService {

  constructor(
    @Inject("TABLE_REPOSITORY")
    private tableRepository: Repository<Table>,
    @Inject('PERSON_REPOSITORY')
    private personRepository: Repository<Person>,
    @Inject('ORDERS_REPOSITORY')
    private ordersRepository: Repository<Order>
  ) { }

  async create(restaurantId: number, createTableDto: CreateTableDto) {

    const table = await this.tableRepository.findOneBy({ code: createTableDto.code, restaurant: { id: restaurantId } })
    if (table) {
      throw new ValidationException(CodigoMesaJaExistente)
    }

    const tableEntity = await this.tableRepository.create({ code: createTableDto.code, restaurant: { id: restaurantId } })

    return await this.tableRepository.save(tableEntity)
  }

  async findAll(restaurantId: number): Promise<Table[]> {
    const tables = await this.tableRepository.find({ where: { restaurant: { id: restaurantId } }, relations: ['persons', 'waiter'] });
    let tablesOutput = [];
    for (const table of tables) {
      const sqlQuery = `
        SELECT o.id AS "id"
        FROM \`order\` AS o
        WHERE o.tableId = ${table.id}
      `;

      const ordersResult = await this.tableRepository.query(sqlQuery);
      let orders = [];
      let ordersQuantity = 0;
      for (const order of ordersResult) {
        const orderEntity = await this.ordersRepository.findOneBy({ id: order.id });
        orders.push({
          id: orderEntity.id,
          name: orderEntity.product.name,
          price: orderEntity.product.price,
          status: orderEntity.status,
        });
        ordersQuantity++;
      }

      let customers = [];
      for (const customer of table.persons) {
        customers.push({
          id: customer.id,
          name: customer.name,
        });
      }

      const tableInfo = {
        token: table.code,
        id: table.id,
        openTime: table.openedAt,
        customers: customers,
        status: table.status,
        waiter: table.waiter?.name
      }

      tablesOutput.push({
        id: table.id,
        table: tableInfo,
        orders: orders,
        ordersQuantity: ordersQuantity,
      });
    }

    return tablesOutput;
  }

  async addCustomer(addCustomerDto: AddCustomerDto) {
    const table = await this.tableRepository.findOneBy({ id: addCustomerDto.tableId });
    if (!table) {
      throw new ValidationException("Mesa não encontrada");
    }
    const customer = await this.personRepository.findOneBy({ id: addCustomerDto.customerId });

    if (!customer) {
      throw new ValidationException("Cliente não encontrado");
    }

    customer.table = table
    await this.personRepository.save(customer);
  }

  async addWaiter(addWaiterDto: AddWaiterDto) {
    const table = await this.tableRepository.findOneBy({ id: addWaiterDto.tableId })
    if (!table) {
      throw new ValidationException("Mesa não encontrada");
    }
    const waiter = await this.personRepository.findOneBy({ id: addWaiterDto.waiterId })

    if (!waiter) {
      throw new ValidationException("Garçom não encontrado");
    }
    if (table.waiter) {
      throw new ValidationException("Esta mesa já tem garçom");
    }

    table.waiter = waiter;;
    await this.tableRepository.save(table);
  }

  async findOne(id: number) {
    const table = await this.tableRepository.findOne(
      {
        where: {id: id},
        relations: ['persons', 'waiter']
      }
    );

    if (!table) {
      throw new ValidationException("Mesa não encontrada");
    }

    const sqlQuery = `
      SELECT o.id AS "id"
      FROM \`order\` AS o
      WHERE o.tableId = ${table.id}
    `;

    const ordersResult = await this.tableRepository.query(sqlQuery);

    let orders = [];
    for (const order of ordersResult) {
      const orderEntity = await this.ordersRepository.findOneBy({ id: order.id });

      let customers = [];
      for (const customer of orderEntity.people) {
        customers.push({
          id: customer.id,
          name: customer.name,
        });
      }

      orders.push({
        id: orderEntity.id,
        menuItem: {
          id: orderEntity.product.id,
          name: orderEntity.product.name,
          price: orderEntity.product.price,
          description: '',
        },
        customers: customers,
        status: orderEntity.status,
        orderedTime: orderEntity.date,
        deliveredTime: orderEntity.checkouted ? orderEntity.date : 'Não entregue',
      });
    }

    let tableCustomers = [];
    for (const tablePerson of table.persons) {
      tableCustomers.push({
        id: tablePerson.id,
        name: tablePerson.name,
      });
    }

    const tableInfo = {
      token: table.code,
      id: table.id,
      openTime: table.openedAt,
      customers: tableCustomers,
      status: table.status,
      reponsableWaiter: table.waiter.name
    }

    return {
      table: tableInfo,
      orders: orders,
    }
  }

  update(id: number, updateTableDto: UpdateTableDto) {
    return `This action updates a #${id} table`;
  }

  remove(id: number) {
    return `This action removes a #${id} table`;
  }
}
