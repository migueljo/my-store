import { faker } from '@faker-js/faker';
import * as Boom from '@hapi/boom';
import { v4 as uuid } from 'uuid';

import { Product } from './products.schema.js';

import { ProductModel } from './products.model.js';

export class ProductsService {
  private products;

  constructor() {
    this.products = this.generate();
  }

  private generate(size = 100): Product[] {
    // TODO: Use real DB
    const first: Product = {
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.url(),
      id: '4136cd0b-d90b-4af7-b485-5d1ded8db252',
      blocked: true,
    };
    const products: Product[] = [...Array(size)].map(() => ({
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.url(),
      id: faker.string.uuid(),
      blocked: faker.datatype.boolean(),
    }));
    return [first, ...products];
  }

  async create(product: Omit<Product, 'id'>): Promise<Product> {
    const newProduct = await ProductModel.create({
      ...product,
      id: uuid(),
    });

    return newProduct.toJSON();
  }

  async findAll(): Promise<Product[]> {
    // TODO: Read this: https://sequelize.org/docs/v6/core-concepts/model-querying-basics/
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

  async delete(productId: string): Promise<{ id: string }> {
    const productToDelete = await this.findOne(productId);
    if (!productToDelete) {
      throw new Error('Product not found');
    }
    if (productToDelete) {
      const products = this.products.filter(
        (product) => product.id !== productId,
      );
      this.products = products;
    }
    return { id: productId };
  }
}
