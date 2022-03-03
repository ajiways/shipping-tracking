import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'market_service',
        protoPath: join(__dirname, '../../contracts/orders.proto'),
        url: '127.0.0.1:3004',
      },
    },
  );
  await app.init();
  await app.listen();
}
bootstrap();
