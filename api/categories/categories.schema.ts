import { z } from 'zod';

export const CategorySchema = z.object({
  name: z.string(),
  image: z.string().url(),
  id: z.string().uuid(),
});

export type Category = z.infer<typeof CategorySchema>;
