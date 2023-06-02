import { faker } from '@faker-js/faker';

type ProductOptions = {
  size: number;
};

type Product = {
  name: string;
  price: number;
  image: string;
  id: string;
};

export class ProductsService {
  private products;

  constructor() {
    this.products = this.generate();
  }

  private generate(size = 100): Product[] {
    const products: Product[] = [...Array(size)].map(() => ({
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.url(),
      id: faker.string.uuid(),
    }));
    return products;
  }

  create(product: Omit<Product, 'id'>): Product {
    const newProduct = {
      ...product,
      id: faker.string.uuid(),
    };
    this.products.push(newProduct);
    return newProduct;
  }
  findAll(): Product[] {
    console.log('Find all', this.products);
    return this.products;
  }
  findOne(productId: string): Product | undefined {
    return this.products.find((product) => product.id === productId);
  }
  update(productId: string, changes: Partial<Product>): boolean {
    const productToUpdate = this.findOne(productId);
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

    return !!productToUpdate;
  }
  delete(productId: string): boolean {
    const productToDelete = this.findOne(productId);
    if (productToDelete) {
      const products = this.products.filter(
        (product) => product.id !== productId,
      );
      this.products = products;
    }
    return !!productToDelete;
  }
}
