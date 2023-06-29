import { z } from 'zod';

export const OrderSchema = z.object({
  id: z.string().uuid(),
  customerId: z.string().uuid(),
});

export type OrderType = z.infer<typeof OrderSchema>;
