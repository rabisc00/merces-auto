import { z } from 'zod';

export const busCreateSchema = z.object({
    busNumber: z.string(),
    model: z.string().optional(),
    capacity: z.number().optional(),
    manufacturingYear: z.number().optional()
});

export const busUpdateSchema = z.object({
    busNumber: z.string().optional(),
    model: z.string().optional(),
    capacity: z.number().optional(),
    manufacturingYear: z.number().optional(),
    inRepair: z.boolean().optional()
});