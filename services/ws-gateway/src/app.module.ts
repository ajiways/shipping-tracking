import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { WebSocketController } from './websocket.controller';

@Module({
  imports: [],
  controllers: [WebSocketController],
  providers: [AppService],
})
export class AppModule {}
