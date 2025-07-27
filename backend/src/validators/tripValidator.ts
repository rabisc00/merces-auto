import { z } from 'zod';
import { UUID_REGEX } from '../constants/id';

export const tripCreateSchema = z.object({
    numberOfPassengers: z.number(),
    observations: z.string().optional(),
    userId: z.string().regex(UUID_REGEX, {
        error: 'Invalid UUID format'
    }),
    busId: z.string().regex(UUID_REGEX, {
        error: 'Invalid UUID format'
    }),
    timetableId: z.string().regex(UUID_REGEX, {
        error: 'Invalid UUID format'
    })
});

export const tripEditSchema = z.object({
    numberOfPassengers: z.number().optional(),
    observations: z.string().optional(),
    userId: z.string().regex(UUID_REGEX).optional(),
    busId: z.string().regex(UUID_REGEX).optional(),
    timetableId: z.string().regex(UUID_REGEX).optional()
});