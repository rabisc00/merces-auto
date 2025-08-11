import { z } from 'zod';
import { UUID_REGEX } from '../constants/id';


export const timetableCreateSchema = z.object({
    busRouteId: z.string().regex(UUID_REGEX, {
        error: 'Invalid UUID format'
    }),
    arrivalTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
        message: "Invalid time format. Expected HH:mm (24-hour).",
    }),
    departureTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
        message: "Invalid time format. Expected HH:mm (24-hour).",
    }),
    days: z.array(z.int().min(0).max(6)).min(1, {
        error: 'Days can\'t be empty'
    })
});

export const timetableEditSchema = z.object({
    arrivalTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
        message: "Invalid time format. Expected HH:mm (24-hour).",
    }).optional(),
    departureTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
        message: "Invalid time format. Expected HH:mm (24-hour).",
    }).optional(),
    days: z.array(z.int().min(0).max(6)).optional()
});