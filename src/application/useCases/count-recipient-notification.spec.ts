import { makeNotification } from '@test/factories/notification-factory'
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository'
import { CountRecipientNotification } from './count-recipient-notification'


describe('Count recipient notifications', () => {

  it('should be able to count recipient notifications', async () => {
    const notificationRepository = new InMemoryNotificationsRepository()
    const countRecipientNotifications = new CountRecipientNotification(notificationRepository)

    await notificationRepository.create(makeNotification({ recipientId: 'example-1' }))

    await notificationRepository.create(makeNotification({ recipientId: 'example-1' }))

    await notificationRepository.create(makeNotification({ recipientId: 'example-2' }))

    const { count } = await countRecipientNotifications.execute({
      recipientId: 'example-1'
    })

    expect(count).toEqual(2)
  })

})