import express from 'express';

import validatorHandler from '../middleware/validator-handler.middleware.js';
import { CustomersService } from './customers.service.js';
import { CustomerSchema } from './customers.schema.js';

export const customersRouter = express.Router();
const baseUrl = '/customers';
const customersService = new CustomersService();

customersRouter.get(baseUrl, async (_req, res) => {
  const customers = await customersService.findAll();
  res.json(customers);
});

customersRouter.get(
  `${baseUrl}/:id`,
  validatorHandler(CustomerSchema.pick({ id: true }), 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const customer = await customersService.findOne(id);
      res.json(customer);
    } catch (error) {
      next(error);
    }
  },
);

customersRouter.post(
  baseUrl,
  validatorHandler(CustomerSchema.omit({ id: true }), 'body'),
  async (req, res, next) => {
    try {
      const customer = req.body;
      const newCustomer = await customersService.create(customer);
      res.status(201).json(newCustomer);
    } catch (error) {
      next(error);
    }
  },
);

customersRouter.patch(
  `${baseUrl}/:id`,
  validatorHandler(CustomerSchema.pick({ id: true }), 'params'),
  validatorHandler(CustomerSchema.omit({ id: true }).partial(), 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const customerChanges = req.body;
      const updatedCustomer = await customersService.update(
        id,
        customerChanges,
      );
      res.json(updatedCustomer);
    } catch (error) {
      next(error);
    }
  },
);

customersRouter.delete(
  `${baseUrl}/:id`,
  validatorHandler(CustomerSchema.pick({ id: true }), 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedCustomer = await customersService.delete(id);
      res.json(deletedCustomer);
    } catch (error) {
      next(error);
    }
  },
);
