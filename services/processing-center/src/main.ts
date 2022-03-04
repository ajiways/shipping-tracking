import { NAVIGATION_PROCESSING } from './constants/constants';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { BROKER_HOST, BROKER_PORT } from './constants/config.contsants';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [`${BROKER_HOST}:${BROKER_PORT}`],
      },
      consumer: {
        groupId: NAVIGATION_PROCESSING,
      },
    },
  });
  app.listen();
}
bootstrap();
