import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import 'dotenv/config';

const serverPort =process.env.PORT

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(serverPort);
  Logger.log(`Server started running on http://localhost:${serverPort}`)
}
bootstrap();
