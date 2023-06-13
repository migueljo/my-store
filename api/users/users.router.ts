import express from 'express';

import validatorHandler from '../middleware/validator-handler.middleware.js';
import { UsersService } from './users.service.js';
import { UserSchema } from './users.schema.js';

export const usersRouter = express.Router();
const baseUrl = '/users';
const usersService = new UsersService();

usersRouter.get(baseUrl, async (_req, res) => {
  const users = await usersService.findAll();
  res.json(users);
});

usersRouter.get(
  `${baseUrl}/:id`,
  validatorHandler(UserSchema.pick({ id: true }), 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await usersService.findOne(id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  },
);

usersRouter.post(
  baseUrl,
  validatorHandler(UserSchema.omit({ id: true }), 'body'),
  async (req, res, next) => {
    try {
      const user = req.body;
      const newUser = await usersService.create(user);
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  },
);

usersRouter.patch(
  `${baseUrl}/:id`,
  validatorHandler(UserSchema.pick({ id: true }), 'params'),
  validatorHandler(UserSchema.omit({ id: true }).partial(), 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const userChanges = req.body;
      const updatedUser = await usersService.update(id, userChanges);
      res.json(updatedUser);
    } catch (error) {
      next(error);
    }
  },
);

usersRouter.delete(
  `${baseUrl}/:id`,
  validatorHandler(UserSchema.pick({ id: true }), 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedUser = await usersService.delete(id);
      res.json(deletedUser);
    } catch (error) {
      next(error);
    }
  },
);
