import { z } from 'zod';
import { isValidDate } from '../utils/dateUtils';
import { UUID_REGEX } from '../constants/id';


export const timetableCreateSchema = z.object({
    busRouteId: z.string().regex(UUID_REGEX, {
        error: 'Invalid UUID format'
    }),
    arrivalTime: z.string().refine(isValidDate, {
        message: 'Invalid format: arrivalTIme must be YYYY-MM-DD HH:mm:ss'
    }),
    departureTime: z.string().refine(isValidDate, {
        message: 'Invalid format: departureTime must be YYYY-MM-DD HH:mm:ss'
    }),
    days: z.array(z.string().nonempty())
});

export const timetableEditSchema = z.object({
    arrivalTime: z.string().refine(isValidDate, {
        message: 'Invalid format: arrivalTIme must be YYYY-MM-DD HH:mm:ss'
    }).nullable().optional(),
    departureTime: z.string().refine(isValidDate, {
        message: 'Invalid format: departureTime must be YYYY-MM-DD HH:mm:ss'
    }).nullable().optional(),
    days: z.array(z.string().nonempty()).nullable().optional()
});