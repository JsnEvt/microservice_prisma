import { makeNotification } from '@test/factories/notification-factory'
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository'
import { getRecipientNotification } from './get-recipient-notifications'


describe('Get recipient notifications', () => {

  it('should be able to count recipient notifications', async () => {
    const notificationRepository = new InMemoryNotificationsRepository()
    const getRecipientNotifications = new getRecipientNotification(notificationRepository)

    await notificationRepository.create(makeNotification({ recipientId: 'example-1' }))

    await notificationRepository.create(makeNotification({ recipientId: 'example-1' }))

    await notificationRepository.create(makeNotification({ recipientId: 'example-2' }))

    const { notifications } = await getRecipientNotifications.execute({
      recipientId: 'example-1'
    })

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'example-1' }),
        expect.objectContaining({ recipientId: 'example-1' }),
      ])
    )
  })

})