import express from 'express';

export const categoriesRouter = express.Router();
const baseUrl = '/categories';

categoriesRouter.get(
  `${baseUrl}/:categoryId/products/:productId`,
  (req, res) => {
    const { categoryId, productId } = req.params;

    res.json({ categoryId, productId });
  },
);

categoriesRouter.get(baseUrl, (req, res) => {
  res.json([
    { name: 'category1', id: 0 },
    { name: 'category1', id: 1 },
  ]);
});

categoriesRouter.get(`${baseUrl}/:id`, (req, res) => {
  res.json({ name: 'category1', id: req.params.id });
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
