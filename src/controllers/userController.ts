import { Request, Response } from 'express';
import UserService from '../services/userService';

class UserController {
  constructor(private userService: UserService) { }

  static getInstance(): UserController {
    return new UserController(UserService.getInstance());
  }

  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.userService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      console.error(`getAllUsers error: `, error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password } = req.body;
      const newUser = await this.userService.createUser(name, email, password);

      res.status(201).json(newUser);
    } catch (error) {
      console.error(`createUser error: `, error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    const userId: number = parseInt(req.params.id, 10);

    try {
      const user = await this.userService.getUserById(userId);

      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      res.status(200).json(user);
    } catch (error) {
      console.error(`getUserById error: `, error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    const userId = req.params.id;

    console.log(`userId`, userId)

    try {
      const updatedUser = await this.userService.updateUser(userId, { ...req.body });

      if (!updatedUser) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      res.status(200).json(updatedUser);
    } catch (error) {
      console.error(`updateUser error: `, error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    const userId = req.params.id;

    try {
      const result = await this.userService.deleteUser(userId);

      if (!result) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      res.status(204).send();
    } catch (error) {
      console.error('deleteUser error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default UserController;
