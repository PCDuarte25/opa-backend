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

@Injectable()
export class TableService {

  constructor(
    @Inject("TABLE_REPOSITORY")
    private tableRepository: Repository<Table>,
    @Inject('PERSON_REPOSITORY')
    private personRepository: Repository<Person>,
  ) { }

  async create(createTableDto: CreateTableDto) {

    const table = await this.tableRepository.findOneBy({ code: createTableDto.code })
    if (table) {
      throw new ValidationException(CodigoMesaJaExistente)
    }

    const tableEntity = await this.tableRepository.create({ code: createTableDto.code })

    return await this.tableRepository.save(tableEntity)
  }

  async findAll(): Promise<Table[]> {
    const tables = await this.tableRepository.find({ relations: ['persons', 'waiter'] });
    let tablesOutput = [];
    for (const table of tables) {
      const sqlQuery = `
        SELECT o.id AS "id", o.status AS "status", p.name AS "name", p.price AS "price", COUNT(o.id) AS "quantity"
        FROM \`order\` AS o
        INNER JOIN product AS p
        ON p.id = o.productId
        WHERE o.tableId = ${table.id}
        GROUP BY o.id;
      `;

      const ordersResult = await this.tableRepository.query(sqlQuery);
      let orders = [];
      let ordersQuantity = 0;
      for (const order of ordersResult) {
        orders.push({
          id: order.id,
          name: order.name,
          price: order.price,
          status: order.status,
        });
        ordersQuantity += parseInt(order.quantity);
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
        reponsableWaiter: table.waiter.name
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
    return await this.tableRepository.findBy({ id });
  }

  update(id: number, updateTableDto: UpdateTableDto) {
    return `This action updates a #${id} table`;
  }

  remove(id: number) {
    return `This action removes a #${id} table`;
  }
}