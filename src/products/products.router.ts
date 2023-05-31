import express from 'express';
import { ProductsService } from './products.service.js';

export const productsRouter = express.Router();
const baseUrl = '/products';
const productsService = new ProductsService();

productsRouter.get(baseUrl, (req, res) => {
  const { size = 100 } = req.query;
  const sizeNumber = parseInt(size as string, 10);
  const products = productsService.findAll();

  res.json(products);
});

productsRouter.get(`${baseUrl}/filter`, (req, res) => {
  res.send('Soy filter');
});

productsRouter.get(`${baseUrl}/:id`, (req, res) => {
  const id = req.params.id;
  const product = productsService.findOne(id);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'not found' });
  }
});

// TODO: Implementar el resto de los métodos
// TODO: Implementar /categories and /users
productsRouter.post(baseUrl, (req, res) => {
  const body = req.body;
  res.status(201).json({ message: 'created', data: body });
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
