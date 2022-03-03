import { join } from 'path';
import { GenerateGateway } from './../generate/generate.service';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { BROKER_PORT, BROKER_HOST } from './../../constants/config.contsants';
import {
  NAVIGATION_SERVICE,
  COORDINATES_GRPC,
  COORDINATES_KAFKA,
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
  controllers: [ProcessingController],
  providers: [ProcessingService, GenerateGateway],
  exports: [ProcessingService],
})
export class ProcessingModule {}
