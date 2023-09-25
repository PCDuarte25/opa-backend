import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './datasources/database.module';
import { ConfigModule } from '@nestjs/config';
import { OpaPersonModule } from './opa_person/opa_person.module';
import { EncrypterModule } from './shared/services/encrypter/encrypter.module';
import { AuthModule } from './auth/auth.module';
import { StockModule } from './stock/stock.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot(),
    OpaPersonModule,
    EncrypterModule,
    AuthModule,
    StockModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
