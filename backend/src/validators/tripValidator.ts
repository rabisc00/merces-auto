import { z } from 'zod';
import { UUID_REGEX } from '../constants/id';

export const tripCreateSchema = z.object({
    numberOfPassengers: z.number(),
    observations: z.string(),
    driverId: z.string().regex(UUID_REGEX),
    busId: z.string().regex(UUID_REGEX),
    timetableId: z.string().regex(UUID_REGEX)
});

export const tripEditSchema = z.object({
    numberOfPassengers: z.number().optional(),
    observations: z.string().optional(),
    driverId: z.string().regex(UUID_REGEX).optional(),
    busId: z.string().regex(UUID_REGEX).optional(),
    timetableId: z.string().regex(UUID_REGEX).optional()
});