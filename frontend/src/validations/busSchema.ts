import * as yup from 'yup';

export const busCreateSchema = yup.object({
    busNumber: yup.string().trim().matches(
        /^(0[1-9]|[1-9][0-9])-B-[0-9]{1,5}$/,
        'Must be a valid Irish bus plaque (e.g., 23-B-12345)'
    ).required('Bus number is required'),
    model: yup.string().trim().optional(),
    capacity: yup.number().optional()
        .typeError('Capacity must be a number')
        .integer('Capacity must be a number')
        .optional(),
    manufacturingYear: yup.number()
        .typeError('Year must be a number')
        .integer('Year must be an integer')
        .min(1000, 'Year must be 4 digits')
        .max(9999, 'Year must be 4 digits')
        .optional()
});

export const busUpdateSchema = yup.object({
    model: yup.string().trim().optional(),
    capacity: yup.number().optional()
        .typeError('Capacity must be a number')
        .integer('Capacity must be a number')
        .optional(),
    manufacturingYear: yup.number()
        .typeError('Year must be a number')
        .integer('Year must be an integer')
        .min(1000, 'Year must be 4 digits')
        .max(9999, 'Year must be 4 digits')
        .optional(),
    inRepair: yup.boolean()
});