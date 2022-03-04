import { Module } from '@nestjs/common';
import { RestController } from './rest.controller';
import { RestService } from './rest.service';

@Module({
  providers: [RestService],
  controllers: [RestController],
})
export class AppModule {}
