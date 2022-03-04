import { Module } from '@nestjs/common';
import { RestService } from './rest.service';
import { RestController } from './rest.controller';

@Module({
  providers: [RestService],
  controllers: [RestController],
})
export class RestModule {}
