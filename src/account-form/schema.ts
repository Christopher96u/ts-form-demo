import { z } from 'zod';

export const accountFormSchema = z.object({
  firstName: z.string().min(5, 'First name must be at least 5 characters'),
  lastName: z.string().min(5, 'Last name must be at least 5 characters'),
});

export type AccountFormValues = z.infer<typeof accountFormSchema>;
