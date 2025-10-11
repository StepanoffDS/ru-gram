import { z } from 'zod';

export const loginAccountSchema = z.object({
  login: z
    .string()
    .min(3)
    .max(20)
    .regex(/^[a-zA-Z0-9_-]+$/)
    .or(z.email()),
  password: z.string().min(8),
});

export type LoginAccountSchema = z.infer<typeof loginAccountSchema>;
