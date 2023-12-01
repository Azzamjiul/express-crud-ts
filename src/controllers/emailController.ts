import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import EmailService from '../services/emailService';

class EmailController {
  constructor(private emailService: EmailService) { }

  static getInstance() {
    return new EmailController(EmailService.getInstance());
  }

  async sendEmail(req: Request, res: Response): Promise<void> {
    try {
      const { to, subject, text } = req.body;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      await this.emailService.sendEmail(to, subject, text);

      res.status(200).json({ message: 'Email proceeded' });
    } catch (error) {
      console.error(`sendEmail error:`, error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default EmailController;
