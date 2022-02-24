import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { resolve } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'nav_service',
        protoPath: resolve(__dirname, './proto/service.proto'),
        url: `127.0.0.1:3001`,
      },
    },
  );

  await app.init();
  await app.listen();
}
bootstrap();
