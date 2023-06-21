import { z } from 'zod';

export const CustomerSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  lastName: z.string(),
  phone: z.string(),
  createdAt: z.date(),
});

export type CustomerType = z.infer<typeof CustomerSchema>;
