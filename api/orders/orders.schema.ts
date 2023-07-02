import { z } from 'zod';

export const OrderSchema = z.object({
  id: z.string().uuid(),
  customerId: z.string().uuid(),
});

export type OrderType = z.infer<typeof OrderSchema>;

export const OrderProductSchema = z.object({
  orderId: z.string().uuid(),
  productId: z.string().uuid(),
  amount: z.number().int(),
});

export type OrderProductType = z.infer<typeof OrderProductSchema>;
