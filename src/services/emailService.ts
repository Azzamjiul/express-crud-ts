import sendToRabbitMQ from '../lib/rabbitmq';

class EmailService {
  constructor() { }

  static getInstance() {
    return new EmailService();
  }

  async sendEmail(to: string, subject: string, text: string): Promise<void> {
    try {
      const mailOptions = {
        from: process.env.MAIL_FROM,
        to,
        subject,
        text,
      };
      const message = { mailOptions };
      await sendToRabbitMQ(message, 'email-queue');
    } catch (error) {
      throw error;
    }
  }
}

export default EmailService;
