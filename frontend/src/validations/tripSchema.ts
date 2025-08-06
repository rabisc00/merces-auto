import * as yup from 'yup';
import { dateRegex } from '../const/date';
import dayjs from 'dayjs';

const validDate = (value: any) => {
    if (!value) return false;

    const date = new Date(value);
    const isValid = !isNaN(date.getTime()) && value === date.toISOString().slice(0, 10);

    return isValid;
}

export const tripCreateSchema = yup.object({
    timetableId: yup.string().uuid('Invalid timetable id').required('Bus route is required'),
    userId: yup.string().uuid('Invalid user id').required('User is required'),
    busId: yup.string().uuid('Invalid bus id').required('Bus is required'),
    date: yup.string().required('Date is required')
        .matches(dateRegex, 'Date must be in YYYY-MM-DD format')
        .test('is-valid-date', 'Date is not a valid calendar date', validDate)
        .test('is-future-date', 'Date can\'t be in the future', (value) => {
            if (!value) return false;

            const inputData = dayjs(value, 'YYYY-MM-DD');
            const today = dayjs().startOf('day');
            return inputData.isBefore(today)
        }),
    numberOfPassengers: yup.number().required(),
    observations: yup.string().optional()
});

export const tripUpdateSchema = yup.object({
    timetableId: yup.string().uuid('Invalid timetable id').required('Bus route is required'),
    userId: yup.string().uuid('Invalid user id').required('User is required'),
    busId: yup.string().uuid('Invalid bus id').required('Bus is required'),
    date: yup.string().required('Date is required')
        .matches(dateRegex, 'Date must be in YYYY-MM-DD format')
        .test('is-valid-date', 'Date is not a valid calendar date', validDate)
        .test('is-future-date', 'Date can\'t be in the future', (value) => {
            if (!value) return false;

            const inputData = dayjs(value, 'YYYY-MM-DD');
            const today = dayjs().startOf('day');
            return inputData.isBefore(today)
        }),
    numberOfPassengers: yup.number().required('Number of passengers is required'),
    observations: yup.string().optional()
});