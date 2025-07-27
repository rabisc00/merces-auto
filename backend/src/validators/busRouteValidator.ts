import { z } from 'zod';

export const busRouteCreateSchema = z.object({
    lineNumber: z.string().min(1, {
        error: 'Line number is required'
    }),
    origin: z.string().min(1, {
        error: 'Origin is required'
    }),
    destination: z.string().min(1, {
        error: 'Destination is required'
    })
});

export const busRouteEditSchema = z.object({
    lineNumber: z.string().min(1, {
        error: 'Line number can\'t be empty'
    }).optional(),
    origin: z.string().min(1, {
        error: 'Origin can\'t be empty'
    }).optional(),
    destination: z.string().min(1, {
        error: 'Destination can\'t be empty'
    }).optional()
});