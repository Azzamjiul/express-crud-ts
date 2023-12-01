import express, { Request, Response, NextFunction } from 'express';
import { body, param, validationResult } from 'express-validator';
import UserController from '../controllers/userController';

const router = express.Router();
const userController = UserController.getInstance();

function validateResult(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

const validateUser = [
  body('name')
    .exists().withMessage('name is required')
    .bail()
    .isString().withMessage('name must be a string'),

  body('email')
    .exists().withMessage('email is required')
    .bail()
    .isEmail().withMessage('email format is not valid'),

  body('password')
    .exists().withMessage('password is required'),
];

const validateUserId = [
  param('id')
    .exists().withMessage('id param is required')
    .bail()
    .isInt({ min: 1 }).withMessage('id param must be an integer with a minimum value of 1.'),
];

router.get('/', (req: Request, res: Response) => userController.getAllUsers(req, res));
router.get('/:id', validateUserId, validateResult, (req: Request, res: Response) => userController.getUserById(req, res));
router.post('/', validateUser, validateResult, (req: Request, res: Response) => userController.createUser(req, res));
router.put('/:id', validateUserId, validateUser, validateResult, (req: Request, res: Response) => userController.updateUser(req, res));
router.delete('/:id', validateUserId, validateResult, (req: Request, res: Response) => userController.deleteUser(req, res));

export default router;
