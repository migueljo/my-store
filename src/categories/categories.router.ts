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
  try {
    const body = req.body;
    const newCategory = categoryService.create(body);
    res.status(201).json({ message: 'created', data: newCategory });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
});

// TODO: Implementar /categories and /users
categoriesRouter.patch(`${baseUrl}/:categoryId`, (req, res) => {
  try {
    const { categoryId } = req.params;
    const categoryChanges = req.body;
    const updated = categoryService.update(categoryId, categoryChanges);
    res.json({ message: 'updated', updated });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
});

categoriesRouter.delete(`${baseUrl}/:id`, (req, res) => {
  const id = req.params.id;
  res.json({ message: 'deleted', data: { id } });
});
