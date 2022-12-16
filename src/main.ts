import { KafkaConsumerService } from '@infra/messaging/kafka/controllers/kafka-consumer.service';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe())

  const kafkaConsumerService = app.get(KafkaConsumerService) //app.get por estar usando a injecao de dependencias.

  app.connectMicroservice<MicroserviceOptions>({
    strategy: kafkaConsumerService
  })

  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
