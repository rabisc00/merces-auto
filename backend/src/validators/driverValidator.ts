import { z } from 'zod';
import { UUID_REGEX } from '../constants/id';

export const driverCreateSchema = z.object({
    userId: z.string().regex(UUID_REGEX, {
        error: 'Invalid UUID format'
    }),
    documentNumber: z.string().regex(/^[0-9]{7}[A-Z]{1,2}$/, {
        error: 'Invalid Irish PPS number format'
    })
});