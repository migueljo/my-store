import * as Boom from '@hapi/boom';
import { v4 as uuid } from 'uuid';

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

  async findAll(): Promise<ProductType[]> {
    const products = await ProductModel.findAll({ include: ['category'] });
    return products.map((product) => product.toJSON());
  }

  async findOne(productId: string): Promise<ProductModel | undefined> {
    const product = await ProductModel.findOne({
      where: { id: productId },
      // TODO: Use the model itself instead of the string
      include: ['category'],
    });
    const productJSON = product?.toJSON();

    if (!productJSON) {
      throw Boom.notFound('Product not found');
    } else if (productJSON.blocked) {
      throw Boom.conflict('Product is blocked');
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
