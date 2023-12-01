import express, { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';
import EmailController from '../controllers/emailController';

const router = express.Router();
const emailController = EmailController.getInstance();

const validateEmail = [
  check('to').isEmail().withMessage('Invalid email format'),
  check('subject').notEmpty().withMessage('Subject is required'),
  check('text').notEmpty().withMessage('Text content is required'),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

router.post('/send', validateEmail, (req: Request, res: Response) => emailController.sendEmail(req, res));

export default router;

