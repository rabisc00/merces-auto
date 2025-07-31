import * as yup from 'yup';

export const busRouteCreateSchema = yup.object({
    lineNumber: yup.string().trim().required('Line number is required'),
    origin: yup.string().trim().required('Origin is required'),
    destination: yup.string().trim().required('Destination is required')
});

export const busRouteUpdateSchema = yup.object({
    lineNumber: yup.string().trim().required('Line number is required'),
    origin: yup.string().trim().required('Origin is required'),
    destination: yup.string().trim().required('Destination is required')
})