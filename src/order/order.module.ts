import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { DataSource } from 'typeorm';
import { Order } from './entities/order.entity';

@Module({
  controllers: [OrderController],
  providers: [OrderService,
    {
      provide: 'ORDERS_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Order),
      inject: ['DATA_SOURCE'],
    }
  ],
})
export class OrderModule { }
