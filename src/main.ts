import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LoggingInterceptor } from './logger/logger.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    //whitelist: true,  ele so vai ver se vai ser enviado so os dados esperados
    //forbidNonWhitelisted: true,  ele bloquea o envio dos dados nao nao estao esperado
    //transform: true,
  }))

  await app.listen(3000);
}
bootstrap();
