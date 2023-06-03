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

// TODO: Validate product fields
productsRouter.post(baseUrl, (req, res) => {
  try {
    const body = req.body;
    const newProduct = productsService.create(body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
});

// TODO: Validate product fields
productsRouter.patch(`${baseUrl}/:id`, (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const updated = productsService.update(id, body);
    res.json({ message: 'updated', updated });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
});

productsRouter.delete(`${baseUrl}/:id`, (req, res) => {
  try {
    const id = req.params.id;
    const deleted = productsService.delete(id);
    res.json({ message: 'deleted', deleted });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
});
