import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfigAsync } from './config/typeorm';
import {
  KAFKA,
  KAFKA_HOST,
  KAFKA_PORT,
  MARKET_NAVIGATION,
} from './constants/constants';
import { OrderController } from './order.controller';
import { OrderEntity } from './order.entity';
import { OrderService } from './order.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    ClientsModule.register([
      {
        name: KAFKA,
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: [`${KAFKA_HOST}:${KAFKA_PORT}`],
          },
          consumer: {
            groupId: MARKET_NAVIGATION,
          },
        },
      },
    ]),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forFeature([OrderEntity]),
  ],
  providers: [OrderService],
  controllers: [OrderController],
  exports: [],
})
export class AppModule {}
