import { z } from 'zod';

export const postSchema = (t: any) =>
  z
    .string()
    .min(5, t('PostcodeMinLength'))
    .regex(/^[0-9-]+$/, t('PostcodeInvalid'));

export const postSchemaOptional = (t: any) =>
  z
    .string()
    .optional()
    .refine((value) => !value || /^[0-9-]+$/.test(value), {
      message: t('PostcodeInvalid'),
    });

export const phoneNumberValidation = (t: any) =>
  z
    .string()
    .refine((value) => !value || value.trim().length >= 8, {
      message: t('PhoneMinLength'),
    })
    .refine((value) => !value || /^[+]?[0-9]+$/.test(value), {
      message: t('PhoneNumberInvalid'),
    });
export const optionalPhoneNumberValidation = (t: any, message: string) =>
  z
    .string()
    .optional()
    .refine((value) => !value || value.trim().length >= 8, {
      message: t('PhoneMinLength'),
    })
    .refine((value) => !value || /^[+]?[0-9]+$/.test(value), { message });

export const optionalNumericStringMinLength = (
  t: any,
  min: number,
  message: string
) =>
  z
    .string()
    .optional()
    .refine((value) => !value || /^[0-9]+$/.test(value), {
      message: t('NumericOnly'),
    })
    .refine((value) => !value || value.length >= min, { message });

export const nameValidation = (t: any) =>
  z
    .string()
    .optional()
    .refine((value) => !value || value.trim().length >= 3, {
      message: t('RequiredField'),
    })
    .refine((value) => !value || /^[a-zA-Z\s-]*$/.test(value), {
      message: t('NameInvalid'),
    });

export const shortRequiredField = (t: any) =>
  z
    .string()
    .optional()
    .refine((value) => !value || value.trim().length >= 1, {
      message: t('RequiredField'),
    })
    .refine((value) => !value || /^[a-zA-Z\s-]*$/.test(value), {
      message: t('InputInvalid'),
    });

export const addressValidation = (t: any) =>
  z
    .string()
    .optional()
    .refine((value) => !value || value.trim().length >= 4, {
      message: t('RequiredField'),
    })
    .refine((value) => !value || /^[a-zA-Z\s-]*$/.test(value), {
      message: t('AddressInvalid'),
    });

export const optionalEmailValidation = (t: any, message: string) =>
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

export const passwordSchema = (t: any) =>
  z
    .string()
    .min(8, t('PasswordMinLength'))
    .refine((value) => /[A-Z]/.test(value), {
      message: t('PasswordCapitalLetter'),
    })
    .refine((value) => /[a-z]/.test(value), {
      message: t('PasswordLowercaseLetter'),
    })
    .refine((value) => /[0-9]/.test(value), {
      message: t('PasswordDigit'),
    })
    .refine((value) => /[^A-Za-z0-9]/.test(value), {
      message: t('PasswordSpecialChar'),
    });

export const termsSchema = (t: any) =>
  z.boolean().refine((value) => value === true, {
    message: t('TermsAgreement'),
  });
