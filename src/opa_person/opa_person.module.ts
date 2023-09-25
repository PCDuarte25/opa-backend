import { Module } from '@nestjs/common';
import { OpaPersonService } from './opa_person.service';
import { OpaPersonController } from './opa_person.controller';
import { DataSource } from 'typeorm';
import { DatabaseModule } from '../datasources/database.module';
import { Person } from '../database_config/person/entity/person.entity';
import { EncrypterModule } from 'src/shared/services/encrypter/encrypter.module';
import { EncrypterService } from 'src/shared/services/encrypter/encrypter.service';

@Module({
  imports: [DatabaseModule, EncrypterModule],
  controllers: [OpaPersonController],
  providers: [
    {
      provide: 'PERSON_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Person),
      inject: ['DATA_SOURCE'],
    },
    {
      provide: 'ENCRYPTER_SERVICE',
      useFactory: () => new EncrypterService(),
    },
    OpaPersonService,
  ],
  exports: [OpaPersonService],
})
export class OpaPersonModule {}