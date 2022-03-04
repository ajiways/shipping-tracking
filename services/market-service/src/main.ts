import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { GRPC_HOST, MARKET_SERVICE } from './constants/constants';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: MARKET_SERVICE,
        protoPath: join(__dirname, '../contracts/orders.proto'),
        url: GRPC_HOST,
      },
    },
  );
  await app.init();
  await app.listen();
}
bootstrap();
