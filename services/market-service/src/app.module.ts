import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getOrmConfig } from './config/typeorm';
import { OrderModule } from './modules/orders/order.module';
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(getOrmConfig()),
    OrderModule,
  ],
})
export class AppModule {}
