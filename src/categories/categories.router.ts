import express from 'express';

import { CategoriesService } from './categories.service.js';

export const categoriesRouter = express.Router();
const baseUrl = '/categories';
const categoryService = new CategoriesService();

categoriesRouter.get(
  `${baseUrl}/:categoryId/products/:productId`,
  (req, res) => {
    const { categoryId, productId } = req.params;

    res.json({ categoryId, productId });
  },
);

categoriesRouter.get(baseUrl, (req, res) => {
  try {
    const categories = categoryService.findAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
});

categoriesRouter.get(`${baseUrl}/:categoryId`, (req, res) => {
  try {
    const { categoryId } = req.params;
    const category = categoryService.findOne(categoryId);
    if (category) {
      res.json(category);
    } else {
      res.status(404).json({ message: 'not found' });
    }
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
});

categoriesRouter.post(baseUrl, (req, res) => {
  const body = req.body;
  res.json({ message: 'created', data: body });
});

categoriesRouter.patch(`${baseUrl}/:id`, (req, res) => {
  const id = req.params.id;
  const body = req.body;
  res.json({ message: 'updated', data: { ...body, id } });
});

categoriesRouter.delete(`${baseUrl}/:id`, (req, res) => {
  const id = req.params.id;
  res.json({ message: 'deleted', data: { id } });
});
