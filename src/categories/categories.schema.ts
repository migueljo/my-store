import { z } from 'zod';

export const CategorySchema = z.object({
  name: z.string(),
  id: z.string(),
});

export type Category = z.infer<typeof CategorySchema>;
