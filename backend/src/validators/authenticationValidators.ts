import { z } from 'zod';

export const authenticationSchema = z.object({
    email: z.string(),
    password: z.string()
})