import * as Boom from '@hapi/boom';
import { v4 as uuid } from 'uuid';

import { User } from './users.schema.js';
import { UserModel } from './users.model.js';

console.log('Hello from users.service.ts');

export class UsersService {
  async create(user: Omit<User, 'id'>): Promise<User> {
    const alreadyExists = await UserModel.findOne({
      where: { email: user.email },
    });

    if (alreadyExists) {
      throw Boom.conflict('Email already exists');
    }

    const createdUser = await UserModel.create({
      ...user,
      id: uuid(),
    });
    return createdUser.toJSON();
  }

  async findAll(): Promise<UserModel[]> {
    const response = await UserModel.findAll({
      include: ['customer'],
    });
    return response;
  }

  async findOne(userId: string): Promise<UserModel> {
    const user = await UserModel.findOne({ where: { id: userId } });
    if (!user) {
      throw Boom.notFound('User not found');
    }
    return user;
  }

  async update(userId: string, changes: Partial<User>): Promise<User> {
    const userToUpdate = await this.findOne(userId);
    const updatedUser = await userToUpdate.update(changes);
    return updatedUser.toJSON();
  }

  async delete(userId: string): Promise<User> {
    const userToDelete = await this.findOne(userId);
    await userToDelete.destroy();
    return userToDelete.toJSON();
  }
}
