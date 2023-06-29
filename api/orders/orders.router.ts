import express from 'express';

import validatorHandler from '../middleware/validator-handler.middleware.js';

import { OrdersService } from './orders.service.js';
import { OrderSchema } from './orders.schema.js';

export const ordersRouter = express.Router();
const baseUrl = '/orders';
const ordersService = new OrdersService();

// ordersRouter.get(baseUrl, async (_req, res, next) => {
//   try {
//     const orders = await ordersService.findAll();
//     res.json(orders);
//   } catch (error) {
//     next(error);
//   }
// });

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

// ordersRouter.patch(
//   `${baseUrl}/:id`,
//   validatorHandler(OrderSchema.pick({ id: true }), 'params'),
//   validatorHandler(OrderSchema.omit({ id: true }).partial(), 'body'),
//   async (req, res, next) => {
//     try {
//       const id = req.params.id;
//       const body = req.body;
//       const updatedorder = await ordersService.update(id, body);
//       res.json(updatedorder);
//     } catch (error) {
//       next(error);
//     }
//   },
// );

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
