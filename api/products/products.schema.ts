import { z } from 'zod';

export const ProductSchema = z.object({
  name: z.string(),
  price: z.number().int().min(1),
  image: z.string().url(),
  id: z.string().uuid(),
  description: z.string(),
  categoryId: z.string().uuid(),
});

export const ProductQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).optional(),
  offset: z.coerce.number().int().min(1).optional(),
  price: z.coerce.number().optional(),
  priceMin: z.coerce.number().optional(),
  priceMax: z.coerce.number().optional(),
});

export type ProductType = z.infer<typeof ProductSchema>;
