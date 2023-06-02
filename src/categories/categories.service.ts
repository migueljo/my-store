import { faker } from '@faker-js/faker';

type Category = {
  name: string;
  id: string;
};

export class ProductsService {
  private categories;

  constructor() {
    this.categories = this.generate();
  }

  private generate(size = 100): Category[] {
    const products: Category[] = [...Array(size)].map(() => ({
      name: faker.word.noun(),
      id: faker.string.uuid(),
    }));
    return products;
  }

  create(category: Omit<Category, 'id'>): Category {
    const newCategory = {
      ...category,
      id: faker.string.uuid(),
    };
    this.categories.push(newCategory);
    return newCategory;
  }
  findAll(): Category[] {
    return this.categories;
  }
  findOne(categroyId: string): Category | undefined {
    return this.categories.find((category) => category.id === categroyId);
  }
  update(categoryId: string, changes: Partial<Category>): boolean {
    const categoryToUpdate = this.findOne(categoryId);
    if (categoryToUpdate) {
      const categories = this.categories.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,
            ...changes,
          };
        }
        return category;
      });
      this.categories = categories;
    }

    return !!categoryToUpdate;
  }
  delete(categoryId: string): boolean {
    const categoryToDelete = this.findOne(categoryId);
    if (categoryToDelete) {
      const categories = this.categories.filter(
        (category) => category.id !== categoryId,
      );
      this.categories = categories;
    }
    return !!categoryToDelete;
  }
}
