import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { GRPC_HOST, KAFKA_HOST, KAFKA_PORT } from './misc/config';
import { AppModule } from './app.module';
import { resolve } from 'path';
import { APP_PORT, GROUPID, GRPC_PORT, PACKAGE } from './misc/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({
    transport: Transport.GRPC,
    options: {
      package: PACKAGE,
      protoPath: resolve(__dirname, '../proto/service.proto'),
      url: `${GRPC_HOST}:${GRPC_PORT}`,
    },
  });

  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [`${KAFKA_HOST}:${KAFKA_PORT}`],
      },
      consumer: {
        groupId: GROUPID,
      },
    },
  });

  await app.startAllMicroservices();
  await app.init();
  await app.listen(APP_PORT);
}
bootstrap();
