import { z } from 'zod';

export const busRouteCreateSchema = z.object({
    lineNumber: z.string(),
    origin: z.string(),
    destination: z.string()  
});

export const busRouteEditSchema = z.object({
    lineNumber: z.string().optional(),
    origin: z.string().optional(),
    destination: z.string().optional()
});