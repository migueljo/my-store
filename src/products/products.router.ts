import express from 'express';
import { faker } from '@faker-js/faker';

export const productsRouter = express.Router();
const baseUrl = '/products';

productsRouter.get(baseUrl, (req, res) => {
  const { size = 100 } = req.query;
  const sizeNumber = parseInt(size as string, 10);

  const products = [...Array(sizeNumber)].map(() => ({
    name: faker.commerce.productName(),
    price: parseInt(faker.commerce.price(), 10),
    image: faker.image.url(),
  }));

  res.json(products);
});

productsRouter.get(`${baseUrl}/filter`, (req, res) => {
  res.send('Soy filter');
});

productsRouter.get(`${baseUrl}/:id`, (req, res) => {
  res.json({ id: 0, name: 'Product1', price: 1000 });
});

productsRouter.post(baseUrl, (req, res) => {
  const body = req.body;
  res.json({ message: 'created', data: body });
});

productsRouter.patch(`${baseUrl}/:id`, (req, res) => {
  const id = req.params.id;
  const body = req.body;
  res.json({ message: 'updated', data: { ...body, id } });
});

productsRouter.delete(`${baseUrl}/:id`, (req, res) => {
  const id = req.params.id;
  res.json({ message: 'deleted', data: { id } });
});
