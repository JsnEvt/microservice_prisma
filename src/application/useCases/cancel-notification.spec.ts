import { Content } from '@application/entities/content'
import { Notification } from '@application/entities/notification'
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository'
import { CancelNotification } from './cancel-notification'
import { NotificationNotFound } from './errors/notifcation-not-found'


describe('Cancel notifications', () => {

  it('should be able to send a notification', async () => {
    const notificationRepository = new InMemoryNotificationsRepository()
    const cancelNotification = new CancelNotification(notificationRepository)

    const notification = new Notification({
      category: 'social',
      content: new Content('Nova solicitacao de amizade!'),
      recipientId: 'example',
    });

    await notificationRepository.create(notification)
    await cancelNotification.execute({
      notificationId: notification.id,
    })

    expect(notificationRepository.notifications[0].canceledAt).toEqual(expect.any(Date))
  })

  it('should not be able to cancel a non existing notification', () => {
    const notificationRepository = new InMemoryNotificationsRepository()
    const cancelNotification = new CancelNotification(notificationRepository)

    expect(() => {
      return cancelNotification.execute({
        notificationId: 'fake-notification-id',
      })
    }).rejects.toThrow(NotificationNotFound)
  })
})