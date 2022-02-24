import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { BROKER_HOST, BROKER_PORT } from './constants/config.contsants';
import { NAVIGATION_SERVICE } from './constants/constants';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
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
  );
  await app.listen();
}
bootstrap();
