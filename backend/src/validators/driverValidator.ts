import { z } from 'zod';
import { UUID_REGEX } from '../constants/id';

const PPS_REGEX = /^[0-9]{7}[A-Z]{1,2}$/;

export const driverCreateSchema = z.object({
    userId: z.string().regex(UUID_REGEX, {
        error: 'Invalid UUID format'
    }),
    documentNumber: z.string().regex(PPS_REGEX, {
        error: 'Invalid Irish PPS number format'
    }),
    name: z.string()
});

export const driverEditSchema = z.object({
    documentNumber: z.string().regex(PPS_REGEX).optional(),
    name: z.string().optional(),
    active: z.string().optional()
});