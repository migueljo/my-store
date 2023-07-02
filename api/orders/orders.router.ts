import express from 'express';

import validatorHandler from '../middleware/validator-handler.middleware.js';

import { OrdersService } from './orders.service.js';
import { OrderProductSchema, OrderSchema } from './orders.schema.js';

export const ordersRouter = express.Router();
const baseUrl = '/orders';
const ordersService = new OrdersService();

ordersRouter.get(
  `${baseUrl}/:id`,
  validatorHandler(OrderSchema.pick({ id: true }), 'params'),
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const order = await ordersService.findOne(id);
      res.json(order);
    } catch (error) {
      next(error);
    }
  },
);

ordersRouter.post(
  baseUrl,
  validatorHandler(OrderSchema.omit({ id: true }), 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newOrder = await ordersService.create(body);
      res.status(201).json(newOrder);
    } catch (error) {
      next(error);
    }
  },
);

ordersRouter.post(
  `${baseUrl}/add-product`,
  validatorHandler(OrderProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const newProduct = await ordersService.addProduct(req.body);
      res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
  },
);

ordersRouter.delete(
  `${baseUrl}/:id`,
  validatorHandler(OrderSchema.pick({ id: true }), 'params'),
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const orderDeleted = await ordersService.delete(id);
      res.json(orderDeleted);
    } catch (error) {
      next(error);
    }
  },
);
