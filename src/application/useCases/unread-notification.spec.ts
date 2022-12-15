import { makeNotification } from '@test/factories/notification-factory'
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository'
import { NotificationNotFound } from './errors/notifcation-not-found'
import { UnreadNotification } from './unread-notification'


describe('Unread notifications', () => {

  it('should be able to unread a notification', async () => {
    const notificationRepository = new InMemoryNotificationsRepository()
    const unreadNotification = new UnreadNotification(notificationRepository)

    const notification = makeNotification({
      readAt: new Date()
    })
    await notificationRepository.create(notification)
    await unreadNotification.execute({
      notificationId: notification.id,
    })

    expect(notificationRepository.notifications[0].readAt).toBeNull()
  })

  it('should not be able to unread a non existing notification', () => {
    const notificationRepository = new InMemoryNotificationsRepository()
    const cancelNotification = new UnreadNotification(notificationRepository)

    expect(() => {
      return cancelNotification.execute({
        notificationId: 'fake-notification-id',
      })
    }).rejects.toThrow(NotificationNotFound)
  })
})