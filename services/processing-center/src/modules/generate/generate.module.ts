import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { GenerateController } from './generate.controller';
import { GenerateGateway } from './generate.service';
import { BROKER_PORT, BROKER_HOST } from './../../constants/config.contsants';
import { NAVIGATION_SERVICE } from './../../constants/constants';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'coordinates',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: [`${BROKER_HOST}:${BROKER_PORT}`],
          },
          consumer: {
            groupId: NAVIGATION_SERVICE,
          },
        },
      },
    ]),
  ],
  controllers: [GenerateController],
  providers: [GenerateGateway],
})
export class GenerateModule {}
