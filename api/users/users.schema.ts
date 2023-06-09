import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string().email(),
  age: z.number().int().min(18).max(65),
  password: z.string(),
  // TODO: What roles do we want?
  role: z.enum(['admin', 'user']),
});

export type User = z.infer<typeof UserSchema>;
