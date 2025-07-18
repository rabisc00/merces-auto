import { z } from 'zod';
import { isValidDate } from '../utils/dateUtils';
import { UUID_REGEX } from '../constants/id';

export const workingHoursCreateSchema = z.object({
    driverId: z.string().regex(UUID_REGEX, {
        error: 'Invalid UUID format'
    }),
    startTime: z.string().refine(isValidDate, {
        message: 'Invalid format: startTime must be YYYY-MM-DD HH:mm:ss'
    }),
    endTime: z.string().refine(isValidDate, {
        message: 'Invalid format: endTime must be YYYY-MM-DD HH:mm:ss'
    }),
});

export const workingHoursEditSchema = z.object({
    startTime: z.string().refine(isValidDate, {
        message: 'Invalid format: startTime must be YYYY-MM-DD HH:mm:ss'
    }),
    endTime: z.string().refine(isValidDate, {
        message: 'Invalid format: endTime must be YYYY-MM-DD HH:mm:ss'
    })
})