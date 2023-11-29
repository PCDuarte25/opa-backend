import { Module } from '@nestjs/common';
import { TableService } from './table.service';
import { TableController } from './table.controller';
import { DatabaseModule } from '../datasources/database.module';
import { DataSource } from 'typeorm';
import { Table } from './entities/table.entity';

@Module({
  imports: [DatabaseModule],
  controllers: [TableController],
  providers: [TableService,
    {
      provide: 'TABLE_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Table),
      inject: ['DATA_SOURCE'],
    }],
  exports: [TableService]
})
export class TableModule { }
