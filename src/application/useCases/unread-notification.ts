import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/notifications-repository';
import { NotificationNotFound } from './errors/notifcation-not-found';

interface UnreadNotificationRequest {
  notificationId: string;
}

type UnreadNotifictionResponse = void;

@Injectable()
export class UnreadNotification {
  constructor(private notificationRepository: NotificationsRepository) { }
  async execute(
    request: UnreadNotificationRequest
  ): Promise<UnreadNotifictionResponse> {

    const { notificationId } = request
    const notification = await this.notificationRepository.findById(
      notificationId,
    )
    if (!notification) {
      throw new NotificationNotFound()
    }

    notification.unread()

    await this.notificationRepository.save(notification) //para gravar as informacoes do cancelamento no db.

  }
}

