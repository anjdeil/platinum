import { z } from 'zod';

export const postSchema = z
  .string()
  .min(5, 'The post code must contain at least 5 characters')
  .regex(/^[0-9-]+$/, 'The post code can only contain numbers and hyphens');

export const postSchemaOptional = z
  .string()
  .optional()
  .refine((value) => !value || /^[0-9-]+$/.test(value), {
    message: 'The post code can only contain numbers and hyphens',
  });

export const phoneNumberValidation = (message: string) =>
  z
    .string()
    .refine((value) => !value || value.trim().length >= 8, {
      message: 'The field must contain min. 8 symbols',
    })
    .refine((value) => !value || /^[+]?[0-9]+$/.test(value), { message });

export const optionalPhoneNumberValidation = (message: string) =>
  z
    .string()
    .optional()
    .refine((value) => !value || value.trim().length >= 8, {
      message: 'The field must contain min. 8 symbols',
    })
    .refine((value) => !value || /^[+]?[0-9]+$/.test(value), { message });

export const optionalNumericStringMinLength = (min: number, message: string) =>
  z
    .string()
    .optional()
    .refine((value) => !value || /^[0-9]+$/.test(value), {
      message: 'Only numeric values (0-9) are allowed',
    })
    .refine((value) => !value || value.length >= min, { message });

export const nameValidation = z
  .string()
  .optional()
  .refine((value) => !value || value.trim().length >= 3, {
    message: 'Required field',
  })
  .refine((value) => !value || /^[a-zA-Z\s-]*$/.test(value), {
    message: 'The name can only contain letters, spaces, and hyphens',
  });

export const shortRequiredField = z
  .string()
  .optional()
  .refine((value) => !value || value.trim().length >= 1, {
    message: 'Required field',
  })
  .refine((value) => !value || /^[a-zA-Z\s-]*$/.test(value), {
    message: 'The input can only contain letters, spaces, and hyphens',
  });

export const addressValidation = z
  .string()
  .optional()
  .refine((value) => !value || value.trim().length >= 4, {
    message: 'Required field',
  })
  .refine((value) => !value || /^[a-zA-Z\s-]*$/.test(value), {
    message: 'The address can only contain letters, spaces, and hyphens',
  });

export const optionalEmailValidation = (message: string) =>
  z
    .string()
    .optional()
    .refine(
      (value) =>
        !value ||
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value),
      {
        message,
      }
    );

export const passwordSchema = z
  .string()
  .min(8, 'The password must contain at least 8 characters')
  .refine((value) => /[A-Z]/.test(value), {
    message: 'The password must contain at least one capital letter',
  })
  .refine((value) => /[a-z]/.test(value), {
    message: 'The password must contain at least one lowercase letter',
  })
  .refine((value) => /[0-9]/.test(value), {
    message: 'The password must contain at least one digit',
  })
  .refine((value) => /[^A-Za-z0-9]/.test(value), {
    message: 'The password must contain at least one special character',
  });

export const termsSchema = z.boolean().refine((value) => value === true, {
  message: 'You must agree to the terms',
});
