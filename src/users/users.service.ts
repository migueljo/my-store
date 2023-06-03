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
      name: faker.word.noun(),
      id: faker.string.uuid(),
    }));
    return users;
  }

  create(users: Omit<User, 'id'>): User {
    const newUser = {
      ...users,
      id: faker.string.uuid(),
    };
    this.users.push(newUser);
    return newUser;
  }
  findAll(): User[] {
    return this.users;
  }
  findOne(userId: string): User | undefined {
    return this.users.find((category) => category.id === userId);
  }
  update(userId: string, changes: Partial<User>): boolean {
    const userToUpdate = this.findOne(userId);
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

    return !!userToUpdate;
  }
  delete(userId: string): boolean {
    const userToDelete = this.findOne(userId);
    if (userToDelete) {
      const users = this.users.filter((user) => user.id !== userId);
      this.users = users;
    }
    return !!userToDelete;
  }
}
