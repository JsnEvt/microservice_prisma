import { Content } from './content'

describe('Notification content', () => {
  it('should be able to create a notification content', () => {
    const content = new Content('Voce esta testando a aplicacao criando uma notificacao valida')

    expect(content).toBeTruthy()
  })


  it('should not be able to create a notification content with less than 5 characters', () => {
    expect(() => new Content('aaa')).toThrow()
  })

  it('should not be able to create a notification content with more than 200 characters', () => {
    expect(() => new Content('j'.repeat(201))).toThrow()
  })
})

