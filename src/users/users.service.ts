import { faker } from '@faker-js/faker';
import * as Boom from '@hapi/boom';

import { User } from './users.schema.js';

export class UsersService {
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

  create(users: Omit<User, 'id'>): User {
    const newUser = { ...users, id: faker.string.uuid() };
    this.users.push(newUser);
    return newUser;
  }
  findAll(): User[] {
    return this.users;
  }
  findOne(userId: string): User | undefined {
    const user = this.users.find((category) => category.id === userId);
    if (!user) {
      throw Boom.notFound('User not found');
    }
    return user;
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
