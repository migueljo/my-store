import { faker } from '@faker-js/faker';
import { z } from 'zod';

export const CategorySchema = z.object({
  name: z.string(),
  id: z.string(),
});

export type Category = z.infer<typeof CategorySchema>;

export class CategoriesService {
  private categories;

  constructor() {
    this.categories = this.generate();
  }

  private generate(size = 100): Category[] {
    const first: Category = {
      name: 'First category',
      id: '9836cd0b-d90b-4af7-b485-5d1ded8db245',
    };
    const categories: Category[] = [...Array(size)].map(() => ({
      name: faker.word.noun(),
      id: faker.string.uuid(),
    }));
    return [first, ...categories];
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
  update(categoryId: string, changes: Partial<Category>): Category {
    const categoryToUpdate = this.findOne(categoryId);
    if (!categoryToUpdate) {
      throw new Error('Category not found');
    }

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

    return this.categories.find((category) => category.id === categoryId);
  }
  delete(categoryId: string): { id: string } {
    const categoryToDelete = this.findOne(categoryId);
    if (!categoryToDelete) {
      throw new Error('Category not found');
    }

    if (categoryToDelete) {
      const categories = this.categories.filter(
        (category) => category.id !== categoryId,
      );
      this.categories = categories;
    }
    return { id: categoryId };
  }
}
