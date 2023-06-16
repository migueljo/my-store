import * as Boom from '@hapi/boom';
import { v4 as uuid } from 'uuid';

import { Product } from './products.schema.js';

import { ProductModel } from './products.model.js';

export class ProductsService {
  async create(product: Omit<Product, 'id'>): Promise<Product> {
    const newProduct = await ProductModel.create({
      ...product,
      id: uuid(),
    });

    return newProduct.toJSON();
  }

  async findAll(): Promise<Product[]> {
    // TODO: Read this https://sequelize.org/docs/v6/other-topics/transactions/
    // TODO: Read this https://sequelize.org/docs/v6/other-topics/migrations/#installing-the-cli

    const products = await ProductModel.findAll();
    return products.map((product) => product.toJSON());
  }

  async findOne(productId: string): Promise<ProductModel | undefined> {
    const product = await ProductModel.findOne({ where: { id: productId } });
    const productJSON = product?.toJSON();

    if (!productJSON) {
      throw Boom.notFound('Product not found');
    } else if (productJSON.blocked) {
      throw Boom.conflict('Product is blocked');
    }
    return product;
  }

  async update(productId: string, changes: Partial<Product>): Promise<Product> {
    const productToUpdate = await this.findOne(productId);
    const productUpdated = await productToUpdate.update(changes);
    return productUpdated.toJSON();
  }

  async delete(productId: string): Promise<Product> {
    const productToDelete = await this.findOne(productId);
    await productToDelete.destroy();
    return productToDelete.toJSON();
  }
}
