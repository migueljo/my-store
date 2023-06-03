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

usersRouter.post(baseUrl, (req, res) => {
  const body = req.body;
  res.json({ message: 'created', data: body });
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
