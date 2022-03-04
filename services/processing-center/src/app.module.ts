import { Module } from '@nestjs/common';
import { GenerateModule } from './modules/generate/generate.module';
import { ProcessingModule } from './modules/processing/processing.module';

@Module({
  imports: [GenerateModule, ProcessingModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
