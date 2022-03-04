import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { resolve } from 'path';
import { GRPC, GRPC_HOST, GRPC_PORT, PACKAGE } from './constants/constants';
import { WebSocketController } from './websocket.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: GRPC,
        transport: Transport.GRPC,
        options: {
          package: PACKAGE,
          protoPath: resolve(__dirname, '../proto/service.proto'),
          url: `${GRPC_HOST}:${GRPC_PORT}`,
        },
      },
    ]),
  ],
  controllers: [],
  providers: [WebSocketController],
})
export class AppModule {}
