import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { KAFKA_HOST, KAFKA_PORT } from '../misc/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: [`${KAFKA_HOST}:${KAFKA_PORT}`],
        },
        consumer: {
          groupId: 'navigation.service',
        },
      },
    },
  );

  await app.init();
  await app.listen();
}
bootstrap();
