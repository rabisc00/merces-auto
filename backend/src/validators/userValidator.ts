import { z } from 'zod';

export const userCreateSchema = z.object({
    email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
    password: z.string().min(8, { message: 'Password must be at least 8 characters long' })
    .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
    .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
    .regex(/[0-9]/, { message: 'Password must contain at least one number' })
    .regex(/[^A-Za-z0-9]/, { message: 'Password must contain at least one special character' }),
    isAdmin: z.boolean(),
    name: z.string().min(1, {
        error: 'Name can\'t be empty'
    }),
    documentNumber: z.string()
});

export const userEditSchema = z.object({
    documentNumber: z.string().optional(),
    name: z.string().optional(),
    active: z.string().optional()
});