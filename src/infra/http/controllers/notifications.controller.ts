import { CancelNotification } from '@application/useCases/cancel-notification';
import { CountRecipientNotification } from '@application/useCases/count-recipient-notification';
import { GetRecipientNotification } from '@application/useCases/get-recipient-notifications';
import { ReadNotification } from '@application/useCases/read-notification';
import { UnreadNotification } from '@application/useCases/unread-notification';
import { Body, Controller, Param, Patch, Post, Get } from '@nestjs/common';
import { SendNotification } from 'src/application/useCases/send-notification';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { NotificationViewModel } from '../view-models/notification-view-model';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private readNotification: ReadNotification,
    private unreadNotification: UnreadNotification,
    private countRecipientNotification: CountRecipientNotification,
    private getRecipientNotification: GetRecipientNotification

  ) { }

  @Patch(':id/cancel')
  async cancel(
    @Param('id') id: string) {
    await this.cancelNotification.execute({
      notificationId: id,
    })
  }

  @Get('count/from/:recipientId')
  async countFromRecipient(@Param('recipientId') recipientId: string,
  ) {
    const { count } = await this.countRecipientNotification.execute({
      recipientId,
    })
    return { count }
  }

  @Get('from/:recipientId')
  async getFromRecipient(@Param('recipientId') recipientId: string,
  ) {
    const { notifications } = await this.getRecipientNotification.execute({
      recipientId,
    })
    return {
      notifications: notifications.map(NotificationViewModel.toHTTP)
    }
  }


  @Patch(':id/read')
  async read(
    @Param('id') id: string) {
    await this.readNotification.execute({
      notificationId: id,
    })
  }

  @Patch(':id/unread')
  async unread(
    @Param('id') id: string) {
    await this.unreadNotification.execute({
      notificationId: id,
    })
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) { //a linha substitui o request e o response informados no controller.
    const { recipientId, content, category } = body

    const { notification } = await this.sendNotification.execute({
      recipientId,
      content,
      category,

    })
    return {
      notification: NotificationViewModel.toHTTP(notification)
    }
  }
}
