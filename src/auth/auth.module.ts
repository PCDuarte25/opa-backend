import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { OpaPersonModule } from 'src/opa_person/opa_person.module';
import { OpaPersonService } from 'src/opa_person/opa_person.service';
import { EncrypterModule } from 'src/shared/services/encrypter/encrypter.module';
import { EncrypterService } from 'src/shared/services/encrypter/encrypter.service';
import { JwtModule } from '@nestjs/jwt'
import { AuthGuard } from './auth.guard';
import { DataSource } from 'typeorm';
import { Restaurant } from '../restaurant/entities/restaurant.entity';
import { DatabaseModule } from '../datasources/database.module';

@Module({
  imports: [OpaPersonModule,
    DatabaseModule,
    EncrypterModule,
    JwtModule.register({
      secret: '0p4-ch4v3-5UP3R-53cr3t4',
      signOptions: {
        expiresIn: '30 days',
      }
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard, 
    {
      provide: 'RESTAURANT_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Restaurant),
      inject: ['DATA_SOURCE'],
    },
    { provide: 'PERSON_SERVICE', useExisting: OpaPersonService },
    { provide: 'ENCRYPTER_SERVICE', useExisting: EncrypterService }
  ],
  exports: [AuthGuard]
})
export class AuthModule { }
