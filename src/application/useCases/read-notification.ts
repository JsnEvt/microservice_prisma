import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/notifications-repository';
import { NotificationNotFound } from './errors/notifcation-not-found';

interface ReadNotificationRequest {
  notificationId: string;
}

type ReadNotifictionResponse = void;

@Injectable()
export class ReadNotification {
  constructor(private notificationRepository: NotificationsRepository) { }
  async execute(
    request: ReadNotificationRequest
  ): Promise<ReadNotifictionResponse> {

    const { notificationId } = request
    const notification = await this.notificationRepository.findById(
      notificationId,
    )
    if (!notification) {
      throw new NotificationNotFound()
    }

    notification.read()

    await this.notificationRepository.save(notification) //para gravar as informacoes do cancelamento no db.

  }
}

