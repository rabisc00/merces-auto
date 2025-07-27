import { z } from 'zod';

export const busCreateSchema = z.object({
    busNumber: z.string().min(1, {
        error: 'Bus number is required'
    }),
    model: z.string().optional(),
    capacity: z.number().optional(),
    manufacturingYear: z.number().optional()
});

export const busUpdateSchema = z.object({
    model: z.string().optional(),
    capacity: z.number().optional(),
    manufacturingYear: z.number().optional(),
    inRepair: z.boolean().optional()
});