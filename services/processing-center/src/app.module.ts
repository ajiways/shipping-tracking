import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { GenerateModule } from './modules/generate/generate.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../build'),
    }),
    GenerateModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
