import * as Boom from '@hapi/boom';
import { v4 as uuid } from 'uuid';

import { Category } from './categories.schema.js';
import { CategoryModel } from './categories.model.js';

export class CategoriesService {
  async create(category: Omit<Category, 'id'>): Promise<Category> {
    const categoryCreated = await CategoryModel.create({
      ...category,
      id: uuid(),
    });
    return categoryCreated.toJSON();
  }

  async findAll(): Promise<Category[]> {
    const categories = await CategoryModel.findAll({ include: ['product'] });
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

  async delete(categoryId: string): Promise<Category> {
    const categoryToDelete = await this.findOne(categoryId);
    await categoryToDelete.destroy();

    return categoryToDelete.toJSON();
  }
}
