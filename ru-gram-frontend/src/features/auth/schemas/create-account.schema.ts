import { z } from 'zod';

export const createAccountSchema = z.object({
  username: z
    .string()
    .min(3)
    .max(20)
    .regex(/^[a-zA-Z0-9_-]+$/),
  email: z.email(),
  password: z.string().min(8),
});

export type CreateAccountSchema = z.infer<typeof createAccountSchema>;
