import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { KAFKA_HOST, KAFKA_PORT } from './misc/config';
import { AppModule } from './app.module';
import { resolve } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({
    transport: Transport.GRPC,
    options: {
      package: 'nav_service',
      protoPath: resolve(__dirname, '../proto/service.proto'),
      url: `127.0.0.1:3098`,
    },
  });

  app.connectMicroservice({
    name: 'KAFKA',
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [`localhost:9094`],
      },
      consumer: {
        groupId: 'navigation.service',
      },
    },
  });

  await app.startAllMicroservices();
  await app.init();
  await app.listen(3332);
}
bootstrap();
