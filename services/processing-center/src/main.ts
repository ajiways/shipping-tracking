import { join } from 'path';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { BROKER_HOST, BROKER_PORT } from './constants/config.contsants';
import { NAVIGATION_SERVICE } from './constants/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [`${BROKER_HOST}:${BROKER_PORT}`],
      },
      consumer: {
        groupId: NAVIGATION_SERVICE,
      },
    },
  });

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'market_service',
      protoPath: join(__dirname, './../contracts/orders.proto'),
      url: '127.0.0.1:3005',
    },
  });
  // app.connectMicroservice({})
  app.startAllMicroservices();
  app.listen(2005);
}
bootstrap();
