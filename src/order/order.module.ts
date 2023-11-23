import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { DataSource } from 'typeorm';
import { Order } from './entities/order.entity';
import { ProductModule } from '../product/product.module';
import { Product } from '../product/entities/product.entity';
import { Person } from '../opa_person/entities/opa_person.entity';
import { Table } from '../table/entities/table.entity';
import { Bill } from '../bill/entities/bill.entity';
import { DatabaseModule } from '../datasources/database.module';

@Module({
  controllers: [OrderController],
  providers: [OrderService,
    {
      provide: 'ORDERS_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Order),
      inject: ['DATA_SOURCE'],
    },
    {
      provide: 'PRODUCT_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Product),
      inject: ['DATA_SOURCE'],
    },
    {
      provide: 'PERSON_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Person),
      inject: ['DATA_SOURCE'],
    },
    {
      provide: 'TABLE_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Table),
      inject: ['DATA_SOURCE'],
    },
    {
      provide: 'BILL_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Bill),
      inject: ['DATA_SOURCE'],
    }
  ],
  imports: [DatabaseModule, ProductModule]
})
export class OrderModule { }
