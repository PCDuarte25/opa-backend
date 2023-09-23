import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './datasources/database.module';
import { ConfigModule } from '@nestjs/config';
import { OpaPersonModule } from './opa_person/opa_person.module';
<<<<<<< HEAD
import { EncrypterModule } from './shared/services/encrypter/encrypter.module';
import { AuthModule } from './auth/auth.module';
=======
import { StockModule } from './stock/stock.module';
>>>>>>> 7f2f43d (feat/corrigido endpoint de user person)

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot(),
    OpaPersonModule,
<<<<<<< HEAD
    EncrypterModule,
    AuthModule,
=======
    StockModule
>>>>>>> 7f2f43d (feat/corrigido endpoint de user person)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
