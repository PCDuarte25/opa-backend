import { Module } from '@nestjs/common';
import { BillService } from './bill.service';
import { BillController } from './bill.controller';
import { DataSource } from 'typeorm';
import { Bill } from './entities/bill.entity';
import { DatabaseModule } from 'src/datasources/database.module';

@Module({
  controllers: [BillController],
  providers: [BillService,
    {
      provide: 'BILL_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Bill),
      inject: ['DATA_SOURCE'],
    },
  ],
  imports: [DatabaseModule],
  exports: [BillService]
})
export class BillModule {}
