import * as yup from 'yup';

const PPS_REGEX = /^[0-9]{7}[A-Z]{1,2}$/;

export const userCreateSchema = yup.object({
    email: yup.string().email('Invalid email address').required('Email is required'),
    password: yup.string().trim()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /[A-Z]/, 
      'Must contain at least one uppercase letter (A-Z)'
    )
    .matches(
      /[a-z]/, 
      'Must contain at least one lowercase letter (a-z)'
    )
    .matches(
      /\d/, 
      'Must contain at least one number (0-9)'
    )
    .matches(
      /[-!@#$%^&*(),.?":{}|<>]/, 
      'Must contain at least one special character (!@#$...)'
    ),
    documentNumber: yup.string().trim()
    .required('Document number is required')
    .matches(PPS_REGEX, 'Invalid Irish PPS number format'),
    name: yup.string().trim().min(1, {
        error: 'Name cannot be empty'
    }).required('Name is required')
    .matches(/^[^\d]*$/, 'Name cannot contain numbers')
});

export const userUpdateSchema = yup.object({
  documentNumber: yup.string().trim()
    .required('Document number is required')
    .matches(PPS_REGEX, 'Invalid Irish PPS number format'),
    name: yup.string().trim().min(1, {
        error: 'Name cannot be empty'
    }).required('Name is required')
    .matches(/^[^\d]*$/, 'Name cannot contain numbers')
})