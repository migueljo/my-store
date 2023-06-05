import { z } from 'zod';

export const CategorySchema = z.object({
  name: z.string(),
  id: z.string().uuid(),
});

export type Category = z.infer<typeof CategorySchema>;
