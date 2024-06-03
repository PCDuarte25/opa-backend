import { Module } from '@nestjs/common';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';
import { OpaPersonModule } from '../opa_person/opa_person.module';
import { DatabaseModule } from '../datasources/database.module';
import { DataSource } from 'typeorm';
import { Stock } from './entities/stock.entity';
import { Restaurant } from '../restaurant/entities/restaurant.entity';

@Module({
  imports: [DatabaseModule],
  controllers: [StockController],
  providers: [StockService,
    {
      provide: 'STOCK_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Stock),
      inject: ['DATA_SOURCE'],
    },
    {
      provide: 'RESTAURANT_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Restaurant),
      inject: ['DATA_SOURCE'],
    },
  ],
  exports: [StockService]
})
export class StockModule { }
