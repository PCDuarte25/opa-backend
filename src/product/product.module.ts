import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { DataSource } from 'typeorm';
import { ProductItem } from '../database_config/productItems/entity/productItems.entity';
import { StockModule } from '../stock/stock.module';
import { DatabaseModule } from '../datasources/database.module';
import { Product } from './entities/product.entity';

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
  imports: [StockModule, DatabaseModule],
  exports: [ProductService],
})
export class ProductModule { }
