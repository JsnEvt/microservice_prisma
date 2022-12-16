import { SendNotification } from '@application/useCases/send-notification';
import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { KafkaConsumerService } from './controllers/kafka-consumer.service';
import { NotificationsController } from './controllers/notifications.controller';

@Module({
  imports: [DatabaseModule],
  providers: [
    KafkaConsumerService,
    SendNotification
  ],
  controllers: [NotificationsController],
})
export class MessagingModule { }


