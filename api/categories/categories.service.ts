import { faker } from '@faker-js/faker';
import * as Boom from '@hapi/boom';
import { v4 as uuid } from 'uuid';

import { Category } from './categories.schema.js';
import { CategoryModel } from './categories.model.js';

export class CategoriesService {
  private categories;

  constructor() {
    this.categories = this.generate();
  }

  private generate(size = 100): Category[] {
    // TODO: Use real DB
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

  async create(category: Omit<Category, 'id'>): Promise<Category> {
    const categoryCreated = await CategoryModel.create({
      ...category,
      id: uuid(),
    });
    return categoryCreated.toJSON();
  }

  async findAll(): Promise<Category[]> {
    const categories = await CategoryModel.findAll();
    return categories.map((c) => c.toJSON());
  }

  async findOne(categoryId: string): Promise<CategoryModel> {
    const category = await CategoryModel.findOne({ where: { id: categoryId } });
    if (!category) {
      throw Boom.notFound('Category not found');
    }
    return category;
  }

  async update(
    categoryId: string,
    changes: Partial<Category>,
  ): Promise<Category> {
    const categoryToUpdate = await this.findOne(categoryId);
    const updatedCategory = await categoryToUpdate.update(changes);
    return updatedCategory.toJSON();
  }
  async delete(categoryId: string): Promise<{ id: string }> {
    const categoryToDelete = this.findOne(categoryId);
    if (!categoryToDelete) {
      throw Boom.notFound('Category not found');
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
