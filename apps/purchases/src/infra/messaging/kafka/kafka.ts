import { Kafka } from 'kafkajs'

if (!process.env.KAFKA_BROKER) {
  throw new Error('Kafka broker address not set!')
}

export const kafka = new Kafka({
  clientId: 'purchases',
  brokers: [process.env.KAFKA_BROKER],
  ...(process.env.KAFKA_USER ? {
    sasl: {
      mechanism: 'scram-sha-256',
      username: process.env.KAFKA_USER ?? '',
      password: process.env.KAFKA_PASS ?? '',
    },
    ssl: true,
  } : {})
})