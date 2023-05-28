import express, { Express } from 'express';

import { productsRouter } from './products/products.router.js';
import { categoriesRouter } from './categories/categories.router.js';
import { usersRouter } from './users/users.router.js';

export function routerApi(app: Express): void {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use(productsRouter);
  router.use(categoriesRouter);
  router.use(usersRouter);
}
