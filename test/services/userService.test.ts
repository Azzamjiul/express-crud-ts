import * as sinon from 'sinon';
import { expect } from 'chai';
import UserService from '../../src/services/UserService';
import { mockModel } from '../mock';

describe('UserController', () => {
  let mockUserModel = mockModel();
  let userService = new UserService(mockUserModel);

  beforeEach(() => {
    mockUserModel = mockModel();
    userService = new UserService(mockUserModel);
  });

  describe('getInstance', () => {
    it('should return Userservice', async () => {
      const instance = UserService.getInstance();
      expect(instance).to.be.an.instanceOf(UserService);
    });
  });

  describe('getAllUsers', () => {
    it('should return all users', async () => {
      const mockUsers = [{ id: 1, name: 'User 1' }];
      mockUserModel.findAll.resolves(mockUsers);
      await userService.getAllUsers();
      sinon.assert.calledOnce(mockUserModel.findAll);
    });

    it('should handle errors', async () => {
      mockUserModel.findAll.rejects(new Error('Database error'));

      try {
        await userService.getAllUsers();
      } catch (error) {
        sinon.assert.calledOnce(mockUserModel.findAll);
      }
    });
  });

  describe('createUser', () => {
    const body = {
      name: 'New User',
      email: 'newuser@example.com',
      password: 'newpassword',
    }

    it('should create a new user', async () => {
      mockUserModel.create.resolves({ id: 1, name: 'New User' });

      await userService.createUser(body.name, body.email, body.password);

      sinon.assert.calledOnce(mockUserModel.create);
      sinon.assert.calledWith(mockUserModel.create, body);
    });

    it('should handle errors', async () => {
      mockUserModel.create.rejects(new Error('Database error'));

      try {
        await userService.createUser(body.name, body.email, body.password);
      } catch (error) {
        sinon.assert.calledOnce(mockUserModel.create);
      }
    });
  });

  describe('getUserById', () => {
    it('should return a user by ID', async () => {
      mockUserModel.findByPk.resolves({ id: 1, name: 'User 1' });

      await userService.getUserById(1);

      sinon.assert.calledOnce(mockUserModel.findByPk);
      sinon.assert.calledWith(mockUserModel.findByPk, 1);
    });

    it('should handle errors', async () => {
      mockUserModel.findByPk.rejects(new Error('Database error'));

      try {
        await userService.getUserById(1);
      } catch (error) {
        sinon.assert.calledOnce(mockUserModel.findByPk);
      }
    });
  });

  describe('updateUser', () => {
    const userData = {
      name: 'updated name'
    }

    it('should update a user', async () => {
      mockUserModel.findByPk.resolves({ id: 1, name: 'User 1' });

      await userService.updateUser("1", userData);

      sinon.assert.calledTwice(mockUserModel.findByPk);
      sinon.assert.calledOnce(mockUserModel.update);
      sinon.assert.calledWith(mockUserModel.findByPk, "1");
    });

    it('should handle user not found', async () => {
      mockUserModel.findByPk.resolves(null);

      await userService.updateUser("1", userData);
      sinon.assert.calledOnce(mockUserModel.findByPk);
    });

    it('should handle errors', async () => {
      mockUserModel.findByPk.rejects(new Error('Database error'));

      try {
        await userService.updateUser("1", userData);
      } catch (error) {
        sinon.assert.calledOnce(mockUserModel.findByPk);
      }
    });
  });

  describe('deleteUser', () => {

    it('should destroy a user', async () => {
      mockUserModel.findByPk.resolves({ id: 1, name: 'User 1' });

      await userService.deleteUser("1");

      sinon.assert.calledOnce(mockUserModel.findByPk);
      sinon.assert.calledWith(mockUserModel.findByPk, "1");
      sinon.assert.calledOnce(mockUserModel.destroy);
    });

    it('should handle user not found', async () => {
      mockUserModel.findByPk.resolves(null);

      await userService.deleteUser("1");
      sinon.assert.calledOnce(mockUserModel.findByPk);
    });

    it('should handle errors', async () => {
      mockUserModel.findByPk.rejects(new Error('Database error'));

      try {
        await userService.deleteUser("1");
      } catch (error) {
        sinon.assert.calledOnce(mockUserModel.findByPk);
      }
    });
  });
});
