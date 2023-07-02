import * as Boom from '@hapi/boom';
import { v4 as uuid } from 'uuid';
import type { FindOptions } from 'sequelize';

import { ProductType } from './products.schema.js';

import { ProductModel } from './products.model.js';

export class ProductsService {
  async create(product: Omit<ProductType, 'id'>): Promise<ProductType> {
    const newProduct = await ProductModel.create({
      ...product,
      id: uuid(),
    });

    return newProduct.toJSON();
  }

  async findAll({ limit = null, offset = null } = {}): Promise<ProductType[]> {
    const options: FindOptions<any> = {
      include: ['category'],
    };
    if (limit && offset) {
      options['limit'] = limit;
      options['offset'] = offset;
    }
    const products = await ProductModel.findAll({ include: ['category'] });
    return products.map((product) => product.toJSON());
  }

  async findOne(productId: string): Promise<ProductModel | undefined> {
    const product = await ProductModel.findOne({
      where: { id: productId },
      include: ['category'],
    });
    const productJSON = product?.toJSON();

    if (!productJSON) {
      throw Boom.notFound('Product not found');
    }
    return product;
  }

  async update(
    productId: string,
    changes: Partial<ProductType>,
  ): Promise<ProductType> {
    const productToUpdate = await this.findOne(productId);
    const productUpdated = await productToUpdate.update(changes);
    return productUpdated.toJSON();
  }

  async delete(productId: string): Promise<ProductType> {
    const productToDelete = await this.findOne(productId);
    await productToDelete.destroy();
    return productToDelete.toJSON();
  }
}
