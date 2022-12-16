import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ServerKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaConsumerService
  extends ServerKafka
  implements OnModuleDestroy {
  constructor() {
    super({
      client: {
        clientId: 'notifications',
        brokers: ['darling-pangolin-8997-us1-kafka.upstash.io:9092'],
        sasl: {
          mechanism: 'scram-sha-256',
          username: 'ZGFybGluZy1wYW5nb2xpbi04OTk3JC3m9XyIBmhsn52R1yl-WfuGGZC4LV6HP1g',
          password: 'dA-iiOEvvDNjTTVawJyxQbMtBrVdQqBpbLffJRraKjYHuj1S4o2Qwyv1KHrXvmC9r3F3Lg==',
        },
        ssl: true,
      }
    })
  }
  async onModuleDestroy() {
    await this.close()
  }

}