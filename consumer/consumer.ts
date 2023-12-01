import * as amqp from 'amqplib';
import nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';

dotenv.config();

async function main() {
  try {
    const connection = await amqp.connect('amqp://rabbitmq-ts');
    const channel = await connection.createChannel();
    const queueName = 'email-queue';

    await channel.assertQueue(queueName);

    const mailConfig = {
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    };

    console.log('🚀 RabbitMQ consumer is waiting for messages...');

    channel.consume(queueName, async (message) => {
      if (message !== null) {
        const receivedMessage = JSON.parse(message.content.toString());
        console.log('💡 Received message:', receivedMessage);

        const { mailOptions } = receivedMessage;
        const transporter = nodemailer.createTransport(mailConfig);

        try {
          await transporter.sendMail(mailOptions);
          console.log('Email sent successfully.');
          channel.ack(message);
        } catch (error) {
          console.error('Error sending email:', error);
          channel.reject(message, true);
        }
      }
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

main().catch(console.error);
