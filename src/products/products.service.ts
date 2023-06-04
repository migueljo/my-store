import { faker } from '@faker-js/faker';
import * as Boom from '@hapi/boom';
import { z } from 'zod';

export const ProductSchema = z.object({
  name: z.string(),
  price: z.number().int().min(1),
  image: z.string().url(),
  id: z.string(),
});

export type Product = z.infer<typeof ProductSchema>;

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
    };
    const products: Product[] = [...Array(size)].map(() => ({
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.url(),
      id: faker.string.uuid(),
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
    return this.products;
  }
  async findOne(productId: string): Promise<Product | undefined> {
    const user = this.products.find((product) => product.id === productId);
    if (!user) {
      throw Boom.notFound('Product not found');
    }
    return user;
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
