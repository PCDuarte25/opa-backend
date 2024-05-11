import { Module } from '@nestjs/common';
import { RestaurantController } from './restaurant.controller';
import { RestaurantService } from './restaurant.service';
import { DataSource } from 'typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { Person } from 'src/opa_person/entities/person.entity';
import { DatabaseModule } from 'src/datasources/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [RestaurantController],
  providers: [
    {
      provide: 'RESTAURANT_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Restaurant),
      inject: ['DATA_SOURCE'],
    },
    {
      provide: 'PERSON_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Person),
      inject: ['DATA_SOURCE'],
    },
    RestaurantService,
  ],
  exports: [RestaurantService],
})
export class RestaurantModule {}

