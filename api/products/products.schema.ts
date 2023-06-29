import { z } from 'zod';

export const ProductSchema = z.object({
  // TODO: Remove this after finishing course?
  blocked: z.boolean().optional(),
  name: z.string(),
  price: z.number().int().min(1),
  image: z.string().url(),
  id: z.string().uuid(),
  description: z.string(),
  categoryId: z.string().uuid(),
});

export type ProductType = z.infer<typeof ProductSchema>;
