import express from 'express';

import validatorHandler from '../middleware/validator-handler.middleware.js';
import { CategoriesService } from './categories.service.js';
import { CategorySchema } from './categories.schema.js';

export const categoriesRouter = express.Router();
const baseUrl = '/categories';
const categoryService = new CategoriesService();

categoriesRouter.get(baseUrl, async (_req, res, next) => {
  try {
    const categories = await categoryService.findAll();
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

categoriesRouter.get(
  `${baseUrl}/:id`,
  validatorHandler(CategorySchema.pick({ id: true }), 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await categoryService.findOne(id);
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
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCategory = await categoryService.create(body);
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
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const categoryChanges = req.body;
      const updatedCategory = await categoryService.update(id, categoryChanges);
      res.json(updatedCategory);
    } catch (error) {
      next(error);
    }
  },
);

categoriesRouter.delete(
  `${baseUrl}/:id`,
  validatorHandler(CategorySchema.pick({ id: true }), 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedCategory = await categoryService.delete(id);
      res.json(deletedCategory);
    } catch (error) {
      next(error);
    }
  },
);
