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

  create() {}
  findAll() {
    console.log('Find all', this.products);
    return this.products;
  }
  findOne(productId: string): Product | undefined {
    return this.products.find((product) => product.id === productId);
  }
  update() {}
  delete() {}
}
