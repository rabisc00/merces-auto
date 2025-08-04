import dayjs from 'dayjs';
import * as yup from 'yup';

export const timetableCreateSchema = yup.object({
    busRouteId: yup.string().uuid('Invalid bus route id').required('Bus route is required'),
    arrivalTime: yup.string().test('is-valid-format', 'Invalid datetime format', (value) => { 
        return dayjs(value, 'YYYY-MM-DD HH:mm').isValid();
    }).required('Arrival time is required'),
    departureTime: yup.string().test('is-valid-format', 'Invalid datetime format', (value) => { 
        return dayjs(value, 'YYYY-MM-DD HH:mm').isValid();
    }).required('Departure time is required'),
    days: yup.array().of(yup.string()).min(1).max(7).required()
});

export const timetableUpdateSchema = yup.object({
    busRouteId: yup.string().uuid('Invalid bus route id'),
    arrivalTime: yup.string().test('is-valid-format', 'Invalid datetime format', (value) => { 
        return dayjs(value, 'YYYY-MM-DD HH:mm').isValid();
    }),
    departureTime: yup.string().test('is-valid-format', 'Invalid datetime format', (value) => { 
        return dayjs(value, 'YYYY-MM-DD HH:mm').isValid();
    }),
    days: yup.array().of(yup.string()).min(1).max(7).required()
});