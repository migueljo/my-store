import express from 'express';

import validatorHandler from '../middleware/validator-handler.middleware.js';
import { CategoriesService } from './categories.service.js';
import { CategorySchema } from './categories.schema.js';

export const categoriesRouter = express.Router();
const baseUrl = '/categories';
const categoryService = new CategoriesService();

categoriesRouter.get(baseUrl, (_req, res, next) => {
  try {
    const categories = categoryService.findAll();
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

categoriesRouter.get(
  `${baseUrl}/:id`,
  validatorHandler(CategorySchema.pick({ id: true }), 'params'),
  (req, res, next) => {
    try {
      const { id } = req.params;
      const category = categoryService.findOne(id);
      if (category) {
        res.json(category);
      } else {
        res.status(404).json({ message: 'not found' });
      }
    } catch (error) {
      next(error);
    }
  },
);

categoriesRouter.post(
  baseUrl,
  validatorHandler(CategorySchema.omit({ id: true }), 'body'),
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
  `${baseUrl}/:id`,
  validatorHandler(CategorySchema.pick({ id: true }), 'params'),
  validatorHandler(CategorySchema.omit({ id: true }).partial(), 'body'),
  (req, res, next) => {
    try {
      const { id } = req.params;
      const categoryChanges = req.body;
      const updatedCategory = categoryService.update(id, categoryChanges);
      res.json(updatedCategory);
    } catch (error) {
      next(error);
    }
  },
);

categoriesRouter.delete(
  `${baseUrl}/:id`,
  validatorHandler(CategorySchema.pick({ id: true }), 'params'),
  (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedCategory = categoryService.delete(id);
      res.json(deletedCategory);
    } catch (error) {
      next(error);
    }
  },
);
