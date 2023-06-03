import express from 'express';
import { UsersService } from './users.service.js';

export const usersRouter = express.Router();
const baseUrl = '/users';
const usersService = new UsersService();

usersRouter.get('/users', (req, res) => {
  try {
    const users = usersService.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
});

usersRouter.get('/users/:userId', (req, res) => {
  try {
    const { userId } = req.params;
    const user = usersService.findOne(userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'not found' });
    }
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
});

// TODO: Validate user fields
usersRouter.post(baseUrl, (req, res) => {
  try {
    const user = req.body;
    const newUser = usersService.create(user);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
});

// TODO: Validate user fields
usersRouter.patch(`${baseUrl}/:userId`, (req, res) => {
  try {
    const { userId } = req.params;
    const userChanges = req.body;
    const updated = usersService.update(userId, userChanges);
    res.json({ message: 'updated', updated });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
});

usersRouter.delete(`${baseUrl}/:userId`, (req, res) => {
  try {
    const { userId } = req.params;
    const deleted = usersService.delete(userId);
    res.json({ message: 'deleted', deleted });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
});
