import { join } from 'path';
import { GenerateGateway } from './../generate/generate.service';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  BROKER_PORT,
  BROKER_HOST,
  GRPC_HOST,
  GRPC_PORT,
} from './../../constants/config.contsants';
import {
  COORDINATES_GRPC,
  COORDINATES_KAFKA,
  NAVIGATION_PROCESSING,
  MARKET_SERVICE_GRPC,
} from './../../constants/constants';
import { ProcessingController } from './processing.controller';
import { ProcessingService } from './processing.service';

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
  controllers: [ProcessingController],
  providers: [ProcessingService, GenerateGateway],
  exports: [ProcessingService],
})
export class ProcessingModule {}
