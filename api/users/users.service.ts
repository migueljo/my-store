import { faker } from '@faker-js/faker';
import * as Boom from '@hapi/boom';
import { v4 as uuid } from 'uuid';

import { User } from './users.schema.js';
import { UserModel } from './users.model.js';

export class UsersService {
  // TODO: Use real DB
  private users;

  constructor() {
    this.users = this.generate();
  }

  private generate(size = 100): User[] {
    const first: User = {
      id: '4136cd0b-d90b-4af7-b485-5d1ded8db252',
      name: faker.person.fullName(),
      email: faker.internet.email(),
      age: faker.number.int({ min: 18, max: 65 }),
    };
    const users: User[] = [...Array(size)].map(() => ({
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      age: faker.number.int({ min: 18, max: 65 }),
    }));
    return [first, ...users];
  }

  async create(user: Omit<User, 'id'>): Promise<User | Error> {
    try {
      const createdUser = await UserModel.create({
        ...user,
        id: uuid(),
      });
      return createdUser.toJSON();
    } catch (error) {
      return Boom.internal(error, 'Could not create user');
    }
  }

  async findAll(): Promise<UserModel[]> {
    const response = await UserModel.findAll();
    return response;
  }

  async findOne(userId: string): Promise<User | Error> {
    try {
      const user = await UserModel.findOne({ where: { id: userId } });
      if (!user) {
        throw Boom.notFound('User not found');
      }
      return user.toJSON();
    } catch (error) {
      return Boom.internal(error, 'Could not find user');
    }
  }

  update(userId: string, changes: Partial<User>): User {
    const userToUpdate = this.findOne(userId);
    if (!userToUpdate) {
      throw new Error('User not found');
    }
    if (userToUpdate) {
      const users = this.users.map((users) => {
        if (users.id === userId) {
          return {
            ...users,
            ...changes,
          };
        }
        return users;
      });
      this.users = users;
    }
    return this.users.find((user) => user.id === userId);
  }

  delete(userId: string): { id: string } {
    const userToDelete = this.findOne(userId);
    if (!userToDelete) {
      throw new Error('User not found');
    }

    if (userToDelete) {
      const users = this.users.filter((user) => user.id !== userId);
      this.users = users;
    }

    return { id: userId };
  }
}
