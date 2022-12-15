import { Notification } from '@application/entities/notification';
import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/notifications-repository';

interface GetRecipientNotificationRequest {
  recipientId: string;
}

type getRecipientNotifictionResponse = {
  notifications: Notification[]
};

@Injectable()
export class GetRecipientNotification {
  constructor(private notificationRepository: NotificationsRepository) { }
  async execute(
    request: GetRecipientNotificationRequest
  ): Promise<getRecipientNotifictionResponse> {

    const { recipientId } = request

    const notifications = await this.notificationRepository.findManyByRecipientId(recipientId)
    return {
      notifications,
    }

  }
}

