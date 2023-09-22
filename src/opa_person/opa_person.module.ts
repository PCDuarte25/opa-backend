import { Module } from '@nestjs/common';
import { OpaPersonService } from './opa_person.service';
import { OpaPersonController } from './opa_person.controller';
import { OpaPersonRepository } from './repositories/opa_person.repository';

@Module({
  controllers: [OpaPersonController],
  providers: [
    OpaPersonService,
    {
      provide: OpaPersonRepository,
      useFactory: (typeOrm) => typeOrm.getRepository(OpaPersonRepository),
      inject: [OpaPersonRepository]
    }
  ]
})
export class OpaPersonModule {}
