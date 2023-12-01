import User from '../models/User';

class UserService {
  constructor(private userModel: typeof User) {}

  static getInstance(){
    return new UserService(User);
  }

  async getAllUsers(): Promise<User[]> {
    try {
      return await this.userModel.findAll();
    } catch (error) {
      throw error;
    }
  }

  async createUser(name: string, email: string, password: string): Promise<User> {
    try {
      return await this.userModel.create({ name, email, password });
    } catch (error) {
      throw error;
    }
  }

  async getUserById(userId: number): Promise<User | null> {
    try {
      return await this.userModel.findByPk(userId);
    } catch (error) {
      throw error;
    }
  }

  async updateUser(userId: string, userData: Partial<User>): Promise<User | null> {
    try {
      const user = await this.userModel.findByPk(userId);

      if (!user) {
        return null;
      }

      await this.userModel.update(userData, {
        where: { id: userId },
        returning: true,
      });

      return await this.userModel.findByPk(userId);
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(userId: string): Promise<boolean> {
    try {
      const user = await this.userModel.findByPk(userId);
  
      if (!user) {
        return false;
      }
  
      await this.userModel.destroy({ where: { id: userId } });
      return true;
    } catch (error) {
      throw error;
    }
  }  
}

export default UserService;
