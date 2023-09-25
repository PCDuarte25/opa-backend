import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { OpaPersonModule } from 'src/opa_person/opa_person.module';
import { OpaPersonService } from 'src/opa_person/opa_person.service';
import { EncrypterModule } from 'src/shared/services/encrypter/encrypter.module';
import { EncrypterService } from 'src/shared/services/encrypter/encrypter.service';
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [OpaPersonModule,
     EncrypterModule,
     JwtModule.register({
      global: true,
      secret: '0p4-ch4v3-5UP3R-53cr3t4',
      signOptions: {
        expiresIn: '1h',
      }
     })
    ],
  controllers: [AuthController],
  providers: [AuthService,
    {provide: 'PERSON_SERVICE', useExisting: OpaPersonService},
    {provide: 'ENCRYPTER_SERVICE', useExisting: EncrypterService}
  ]
})
export class AuthModule {}
