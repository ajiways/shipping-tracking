import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { APP_PORT } from './constants/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  await app.init();
  await app.listen(APP_PORT);
}
bootstrap();
