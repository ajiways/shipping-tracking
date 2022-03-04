import { join } from 'path';
import {
  BROKER_HOST,
  BROKER_PORT,
  GRPC_HOST,
  GRPC_PORT,
} from './../../constants/config.contsants';
import {
  COORDINATES_KAFKA,
  COORDINATES_GRPC,
  NAVIGATION_PROCESSING,
  MARKET_SERVICE_GRPC,
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
            groupId: NAVIGATION_PROCESSING,
          },
        },
      },
      {
        name: COORDINATES_GRPC,
        transport: Transport.GRPC,
        options: {
          package: MARKET_SERVICE_GRPC,
          protoPath: join(__dirname, './../../../contracts/orders.proto'),
          url: `${GRPC_HOST}:${GRPC_PORT}`,
        },
      },
    ]),
  ],
  controllers: [],
  providers: [GenerateGateway, ProcessingService],
  exports: [GenerateGateway],
})
export class GenerateModule {}
