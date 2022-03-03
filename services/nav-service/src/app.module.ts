import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { resolve } from 'path';
import { AppService } from './app.service';
import { WebSocketController } from './websocket.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'grpc',
        transport: Transport.GRPC,
        options: {
          package: 'nav_service',
          protoPath: resolve(__dirname, '../proto/service.proto'),
          url: `127.0.0.1:3098`,
        },
      },
    ]),
  ],
  controllers: [],
  providers: [AppService, WebSocketController],
})
export class AppModule {}
