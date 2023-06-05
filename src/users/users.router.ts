import express from 'express';

import validatorHandler from '../middleware/validator-handler.middleware.js';
import { UsersService } from './users.service.js';
import { UserSchema } from './users.schema.js';

export const usersRouter = express.Router();
const baseUrl = '/users';
const usersService = new UsersService();

usersRouter.get(baseUrl, (req, res, next) => {
  const users = usersService.findAll();
  res.json(users);
});

usersRouter.get('/users/:userId', (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = usersService.findOne(userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'not found' });
    }
  } catch (error) {
    next(error);
  }
});

usersRouter.post(
  baseUrl,
  validatorHandler(UserSchema.omit({ id: true }), 'body'),
  (req, res, next) => {
    try {
      const user = req.body;
      const newUser = usersService.create(user);
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  },
);

usersRouter.patch(
  `${baseUrl}/:userId`,
  validatorHandler(UserSchema.omit({ id: true }).partial(), 'body'),
  (req, res, next) => {
    try {
      const { userId } = req.params;
      const userChanges = req.body;
      const updated = usersService.update(userId, userChanges);
      res.json({ message: 'updated', updated });
    } catch (error) {
      next(error);
    }
  },
);

usersRouter.delete(`${baseUrl}/:userId`, (req, res, next) => {
  try {
    const { userId } = req.params;
    const deleted = usersService.delete(userId);
    res.json({ message: 'deleted', deleted });
  } catch (error) {
    next(error);
  }
});
