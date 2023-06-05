import { z } from 'zod';

export const ProductSchema = z.object({
  blocked: z.boolean().optional(),
  name: z.string(),
  price: z.number().int().min(1),
  image: z.string().url(),
  id: z.string(),
});

export type Product = z.infer<typeof ProductSchema>;
