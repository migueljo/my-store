import express from 'express';

import validatorHandler from '../middleware/validator-handler.middleware.js';
import { ProductsService } from './products.service.js';
import { ProductSchema } from './products.schema.js';

export const productsRouter = express.Router();
const baseUrl = '/products';
const productsService = new ProductsService();

productsRouter.get(baseUrl, async (_req, res) => {
  const products = await productsService.findAll();
  res.json(products);
});

productsRouter.get(
  `${baseUrl}/:id`,
  validatorHandler(ProductSchema.pick({ id: true }), 'params'),
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const product = await productsService.findOne(id);
      res.json(product);
    } catch (error) {
      next(error);
    }
  },
);

productsRouter.post(
  baseUrl,
  validatorHandler(ProductSchema.omit({ id: true }), 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newProduct = await productsService.create(body);
      res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
  },
);

productsRouter.patch(
  `${baseUrl}/:id`,
  validatorHandler(ProductSchema.pick({ id: true }), 'params'),
  validatorHandler(ProductSchema.omit({ id: true }).partial(), 'body'),
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const body = req.body;
      const updatedProduct = await productsService.update(id, body);
      res.json(updatedProduct);
    } catch (error) {
      next(error);
    }
  },
);

productsRouter.delete(
  `${baseUrl}/:id`,
  validatorHandler(ProductSchema.pick({ id: true }), 'params'),
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const deleted = await productsService.delete(id);
      res.json({ message: 'deleted', deleted });
    } catch (error) {
      next(error);
    }
  },
);