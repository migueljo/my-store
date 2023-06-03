import { faker } from '@faker-js/faker';

type User = {
  name: string;
  id: string;
};

export class UsersService {
  private users;

  constructor() {
    this.users = this.generate();
  }

  private generate(size = 100): User[] {
    const users: User[] = [...Array(size)].map(() => ({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      age: faker.number.int({ min: 18, max: 65 }),
      id: faker.string.uuid(),
    }));
    return users;
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
    return this.users.find((category) => category.id === userId);
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
