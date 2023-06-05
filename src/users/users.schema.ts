import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  age: z.number().int().min(18).max(65),
});

export type User = z.infer<typeof UserSchema>;
