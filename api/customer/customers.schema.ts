import { z } from 'zod';

export const CustomerSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  lastName: z.string(),
  phone: z.string(),
  userId: z.string().uuid(),
});

export type CustomerType = z.infer<typeof CustomerSchema>;
