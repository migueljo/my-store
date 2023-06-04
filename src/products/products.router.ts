import express from 'express';

import { ProductsService } from './products.service.js';

export const productsRouter = express.Router();
const baseUrl = '/products';
const productsService = new ProductsService();

productsRouter.get(baseUrl, async (req, res) => {
  const { size = 100 } = req.query;
  const sizeNumber = parseInt(size as string, 10);
  const products = await productsService.findAll();

  res.json(products);
});

productsRouter.get(`${baseUrl}/filter`, (req, res) => {
  res.send('Soy filter');
});

productsRouter.get(`${baseUrl}/:id`, async (req, res) => {
  const id = req.params.id;
  const product = await productsService.findOne(id);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'not found' });
  }
});

// TODO: Validate product fields
productsRouter.post(baseUrl, async (req, res, next) => {
  try {
    const body = req.body;
    const newProduct = await productsService.create(body);
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
});

// TODO: Validate product fields
productsRouter.patch(`${baseUrl}/:id`, async (req, res, next) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const updated = await productsService.update(id, body);
    res.json({ message: 'updated', updated });
  } catch (error) {
    next(error);
  }
});

productsRouter.delete(`${baseUrl}/:id`, async (req, res, next) => {
  try {
    const id = req.params.id;
    const deleted = await productsService.delete(id);
    res.json({ message: 'deleted', deleted });
  } catch (error) {
    next(error);
  }
});
