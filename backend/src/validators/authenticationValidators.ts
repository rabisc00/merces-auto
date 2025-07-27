import { z } from 'zod';

export const authenticationSchema = z.object({
    email: z.string().min(1, {
        error: 'Email is required'
    }),
    password: z.string().min(1, {
        error: 'Password is required'
    })
})