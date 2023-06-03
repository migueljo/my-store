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

usersRouter.post(baseUrl, (req, res) => {
  try {
    const user = req.body;
    const newUser = usersService.create(user);
    res.status(201).json({ message: 'created', data: newUser });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
});

usersRouter.patch(`${baseUrl}/:id`, (req, res) => {
  const id = req.params.id;
  const body = req.body;
  res.json({ message: 'updated', data: { ...body, id } });
});

usersRouter.delete(`${baseUrl}/:id`, (req, res) => {
  const id = req.params.id;
  res.json({ message: 'deleted', data: { id } });
});
