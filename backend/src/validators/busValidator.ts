import { z } from 'zod';

export const busCreateSchema = z.object({
    busNumber: z.string(),
    model: z.string().optional(),
    capacity: z.number().optional(),
    manufacturingYear: z.number().optional()
});

export const busUpdateSchema = z.object({
    busNumber: z.string().optional(),
    model: z.string().optional().nullable(),
    capacity: z.number().optional().nullable(),
    manufacturingYear: z.number().optional().nullable(),
    inRepair: z.boolean().optional()
});