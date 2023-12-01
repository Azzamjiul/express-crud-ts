import * as amqp from 'amqplib';

async function sendToRabbitMQ(message: any, queueName: string): Promise<void> {
  try {
    const connection = await amqp.connect('amqp://rabbitmq-ts');
    const channel = await connection.createChannel();

    await channel.assertQueue(queueName);
    await channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));

    console.log('Message sent to RabbitMQ:', message);
  } catch (error) {
    console.error('Error sending message to RabbitMQ:', error);
    throw error;
  }
}

export default sendToRabbitMQ;
