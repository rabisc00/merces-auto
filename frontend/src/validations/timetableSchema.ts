import dayjs from 'dayjs';
import * as yup from 'yup';

export const timetableCreateSchema = yup.object({
    busRouteId: yup.string().uuid('Invalid bus route id').required('Bus route is required'),
    arrivalTime: yup.string().test('is-valid-format', 'Invalid time format', (value) => { 
        return dayjs(value, 'HH:mm').isValid();
    }).required('Arrival time is required'),
    departureTime: yup.string().test('is-valid-format', 'Invalid time format', (value) => { 
        return dayjs(value, 'HH:mm').isValid();
    }).required('Departure time is required'),
    days: yup.array().of(yup.string()).min(1).max(7).required()
});

export const timetableUpdateSchema = yup.object({
    arrivalTime: yup.string().test('is-valid-format', 'Invalid time format', (value) => { 
        return dayjs(value, 'HH:mm').isValid();
    }),
    departureTime: yup.string().test('is-valid-format', 'Invalid time format', (value) => { 
        return dayjs(value, 'HH:mm').isValid();
    }),
    days: yup.array().of(yup.string()).min(0).max(6).required()
});