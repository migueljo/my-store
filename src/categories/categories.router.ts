import express from 'express';

import { CategoriesService, CategorySchema } from './categories.service.js';
import validateBody from '../middleware/validate-body.middleware.js';

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

categoriesRouter.get(baseUrl, (req, res, next) => {
  try {
    const categories = categoryService.findAll();
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

categoriesRouter.get(`${baseUrl}/:categoryId`, (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const category = categoryService.findOne(categoryId);
    if (category) {
      res.json(category);
    } else {
      res.status(404).json({ message: 'not found' });
    }
  } catch (error) {
    next(error);
  }
});

categoriesRouter.post(
  baseUrl,
  validateBody(CategorySchema.omit({ id: true })),
  (req, res, next) => {
    try {
      const body = req.body;
      const newCategory = categoryService.create(body);
      res.status(201).json(newCategory);
    } catch (error) {
      next(error);
    }
  },
);

categoriesRouter.patch(
  `${baseUrl}/:categoryId`,
  validateBody(CategorySchema.omit({ id: true }).partial()),
  (req, res, next) => {
    try {
      const { categoryId } = req.params;
      const categoryChanges = req.body;
      const updatedCategory = categoryService.update(
        categoryId,
        categoryChanges,
      );
      res.json(updatedCategory);
    } catch (error) {
      next(error);
    }
  },
);

categoriesRouter.delete(`${baseUrl}/:categoryId`, (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const deleted = categoryService.delete(categoryId);
    res.json({ message: 'deleted', deleted });
  } catch (error) {
    next(error);
  }
});
