import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { GenerateModule } from './modules/generate/generate.module';
import { ProcessingModule } from './modules/processing/processing.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../build'),
    }),
    GenerateModule,
    ProcessingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
