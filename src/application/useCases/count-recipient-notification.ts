import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/notifications-repository';

interface CountRecipientNotificationRequest {
  recipientId: string;
}

type CountRecipientNotifictionResponse = {
  count: number
};

@Injectable()
export class CountRecipientNotification {
  constructor(private notificationRepository: NotificationsRepository) { }
  async execute(
    request: CountRecipientNotificationRequest
  ): Promise<CountRecipientNotifictionResponse> {

    const { recipientId } = request

    const count = await this.notificationRepository.countManyByRecipientId(recipientId)
    return {
      count,
    }

  }
}

