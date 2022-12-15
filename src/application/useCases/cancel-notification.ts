import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/notifications-repository';
import { NotificationNotFound } from './errors/notifcation-not-found';

interface CancelNotificationRequest {
  notificationId: string;
}

type CancelNotifictionResponse = void;

@Injectable()
export class CancelNotification {
  constructor(private notificationRepository: NotificationsRepository) { }
  async execute(
    request: CancelNotificationRequest
  ): Promise<CancelNotifictionResponse> {

    const { notificationId } = request
    const notification = await this.notificationRepository.findById(
      notificationId,
    )
    if (!notification) {
      throw new NotificationNotFound()
    }

    notification.cancel()

    await this.notificationRepository.save(notification) //para gravar as informacoes do cancelamento no db.

  }
}

