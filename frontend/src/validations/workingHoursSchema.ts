import * as yup from 'yup';

const DATETIME_REGEX = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/;

export const workingHoursCreateSchema = yup.object().shape({
    userId: yup
        .string()
        .uuid('Invalid user id uuid')
        .required('User is required'),
    startTime: yup
        .string()
        .required('Start time is required')
        .matches(DATETIME_REGEX, 'Start time must be in format YYYY-MM-DD HH:mm'),
    endTime: yup
        .string()
        .required('End Time is required')
        .matches(DATETIME_REGEX, 'End time must in format YYYY-MM-DD HH:mm')
});

export const workingHoursUpdateSchema = yup.object().shape({
    startTime: yup
        .string()
        .required('Start time is required')
        .matches(DATETIME_REGEX, 'Start time must be in format YYYY-MM-DD HH:mm'),
    endTime: yup
        .string()
        .required('End Time is required')
        .matches(DATETIME_REGEX, 'End time must in format YYYY-MM-DD HH:mm')
});