import { join } from 'path';
import { BROKER_HOST, BROKER_PORT } from './../../constants/config.contsants';
import {
  NAVIGATION_SERVICE,
  COORDINATES_KAFKA,
  COORDINATES_GRPC,
} from './../../constants/constants';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProcessingService } from '../processing/processing.service';
import { GenerateGateway } from './generate.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: COORDINATES_KAFKA,
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: [`${BROKER_HOST}:${BROKER_PORT}`],
          },
          consumer: {
            groupId: 'navigation.processing',
          },
        },
      },
      {
        name: COORDINATES_GRPC,
        transport: Transport.GRPC,
        options: {
          package: 'market_service',
          protoPath: join(__dirname, './../../../contracts/orders.proto'),
          url: '127.0.0.1:3004',
        },
      },
    ]),
  ],
  controllers: [],
  providers: [GenerateGateway, ProcessingService],
  exports: [GenerateGateway],
})
export class GenerateModule {}
