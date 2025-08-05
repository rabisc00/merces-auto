import { z } from 'zod';
import { UUID_REGEX } from '../constants/id';

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

export const tripCreateSchema = z.object({
    numberOfPassengers: z.number(),
    observations: z.string().optional(),
    date: z.string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format. Use YYYY-MM-DD.')
        .refine((date) => {
            const parsed = new Date(date);
            return !isNaN(parsed.getTime()) && date === parsed.toISOString().slice(0, 10);
        }, {
            message: 'Invalid calendar date.',
        }),
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
    date: z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format. Use YYYY-MM-DD.')
    .refine((date) => {
        const parsed = new Date(date);
        return !isNaN(parsed.getTime()) && date === parsed.toISOString().slice(0, 10);
    }, {
        message: 'Invalid calendar date.',
    }).optional(),
    userId: z.string().regex(UUID_REGEX).optional(),
    busId: z.string().regex(UUID_REGEX).optional(),
    timetableId: z.string().regex(UUID_REGEX).optional()
});