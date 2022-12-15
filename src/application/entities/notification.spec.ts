import { Content } from './content'
import { Notification } from './notification'

describe('Notification', () => {
  it('should be able to create a notification', () => {
    const notification = new Notification({
      content: new Content('Novo teste de TDD'),
      category: 'testes',
      recipientId: 'example-recipient-id',
    })

    expect(notification).toBeTruthy()
  })
})

