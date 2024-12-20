import { parsePhoneNumber } from 'awesome-phonenumber';
import { z } from "zod";

const passwordSchema = z.string()
    .min(8, 'The password must contain at least 8 characters')
    .refine(value => /[A-Z]/.test(value), {
        message: 'The password must contain at least one capital letter'
    })
    .refine(value => /[a-z]/.test(value), {
        message: 'The password must contain at least one lowercase letter'
    })
    .refine(value => /[0-9]/.test(value), {
        message: 'The password must contain at least one digit'
    })
    .refine(value => /[^A-Za-z0-9]/.test(value), {
        message: 'The password must contain at least one special character'
    });

const nipSchema = z.string().min(10, 'Nip number must be 10 characters long')
    .max(10, 'Nip number must be 10 characters long');

const termsSchema = z.boolean().refine(value => value === true, {
    message: "You must agree to the terms",
});

const phoneSchema = z.string().refine(value => parsePhoneNumber(value).valid, {
    message: 'Invalid phone number',
});

export const RegistrationFormSchema = (isLoggedIn: boolean, isCheckout: boolean = false, isShipping: boolean = false) =>
{
    const schema = z.object({
        name: z.string().min(3, 'Required field'),
        lastName: z.string().min(3, 'Required field'),
        email: z.string().email('Please, type valid email'),
        // phoneNumber: phoneSchema,
        country: z.string().min(1, 'Required field'),
        city: z.string().min(1, 'Required field'),
        address1: z.string().min(4, 'Required field'),
        address2: z.string().min(1, 'Required field'),
        apartmentNumber: z.string().min(1, 'Required field'),
        postCode: z.string().min(5, 'The post code must contain 5 characters'),
        password: !isLoggedIn ? passwordSchema : z.string().optional(),
        confirmPassword: !isLoggedIn ? z.string() : z.string().optional(),
        terms: termsSchema,

        // countryCode: z.string().min(1, 'Country code is required'),
        // nip: nipSchema,
        // terms: !isCheckout ? termsSchema : z.string().optional(),
        // nameShipping: isShipping ? z.string().min(3, 'Required field') : z.string().optional(),
        // lastNameShipping: isShipping ? z.string().min(3, 'Required field') : z.string().optional(),
        // companyNameShipping: isShipping ? z.string().min(1, 'Required field') : z.string().optional(),
        // addressShipping: isShipping ? z.string().min(4, 'Required field') : z.string().optional(),
        // postCodeShipping: isShipping ? z.string().min(5, 'The post code must contain 5 characters') : z.string().optional(),
        // cityShipping: isShipping ? z.string().min(1, 'Required field') : z.string().optional(),
        // countryShipping: isShipping ? z.string().min(1, 'Required field') : z.string().optional(),
        // phoneNumberShipping: isShipping ? phoneSchema : z.string().optional(),
    });

    return schema.refine((data) =>
    {
        if (!isCheckout) return data.password === data.confirmPassword;
        return true;
    }, {
        message: 'Passwords do not match.',
        path: ['confirmPassword']
    });
};