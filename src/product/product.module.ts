import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';

import { DataSource } from 'typeorm';
import { StockModule } from '../stock/stock.module';
import { DatabaseModule } from '../datasources/database.module';
import { Product } from './entities/product.entity';
import { ProductItem } from '../database_config/product_item/productItems.entity';

@Module({
  controllers: [ProductController],
  providers: [ProductService,
    {
      provide: 'PRODUCT_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Product),
      inject: ['DATA_SOURCE'],
    },
    {
      provide: 'PRODUCT_ITEM_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(ProductItem),
      inject: ['DATA_SOURCE'],
    },
  ],
  imports: [StockModule, DatabaseModule]
})
export class ProductModule { }
