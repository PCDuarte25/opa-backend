import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './datasources/database.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { StockModule } from './stock/stock.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot(),
    UserModule,
    StockModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
