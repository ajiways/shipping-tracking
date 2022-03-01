import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'market_service',
      protoPath: join(__dirname, '../../contracts/orders.proto'),
      url: '127.0.0.1:3005',
    },
  });
  
  app.startAllMicroservices();
  await app.init();
  await app.listen();
}
bootstrap();

