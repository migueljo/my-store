import { faker } from '@faker-js/faker';
import * as Boom from '@hapi/boom';

import { Product } from './products.schema.js';

import { sequelize } from '../../libs/sequelize.js';

export class ProductsService {
  private products;

  constructor() {
    this.products = this.generate();
  }

  private generate(size = 100): Product[] {
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
    const newProduct = {
      ...product,
      id: faker.string.uuid(),
    };
    this.products.push(newProduct);
    return newProduct;
  }
  async findAll(): Promise<Product[]> {
    // TODO: Read this: https://sequelize.org/docs/v6/core-concepts/model-instances/
    // TODO: Use the pool in other services
    // TODO: Should we get a connection a then release it?
    const query = 'SELECT * FROM tasks';
    const data = await sequelize.query(query);
    return data;
  }
  async findOne(productId: string): Promise<Product | undefined> {
    const product = this.products.find((product) => product.id === productId);
    if (!product) {
      throw Boom.notFound('Product not found');
    } else if (product.blocked) {
      throw Boom.conflict('Product is blocked');
    }
    return product;
  }
  async update(productId: string, changes: Partial<Product>): Promise<Product> {
    const productToUpdate = await this.findOne(productId);
    if (!productToUpdate) {
      throw Boom.notFound('Product not found');
    }

    if (productToUpdate) {
      const products = this.products.map((product) => {
        if (product.id === productId) {
          return {
            ...product,
            ...changes,
          };
        }
        return product;
      });
      this.products = products;
    }

    return this.products.find((product) => product.id === productId);
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
