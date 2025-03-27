import { z } from 'zod';

export const UserInfoFormSchema = (
  isShipping: boolean,
  t: any,
  isInvoice?: boolean
) => {
  const firstNameValidation = z
    .string()
    .min(1, { message: t('pleaseFillInTheFirstName') })
    .min(2, { message: t('yourFirstNameIsTooShort') })
    .max(50, { message: t('yourFirstNameIsTooLong') })
    .regex(/^[\p{L}'-]+$/u, {
      message: t('invalidCharacters'),
    });

  const lastNameValidation = z
    .string()
    .min(1, { message: t('pleaseFillInTheLastName') })
    .min(2, { message: t('yourLastNameIsTooShort') })
    .max(50, { message: t('yourLastNameIsTooLong') })
    .regex(/^[\p{L}'-]+$/u, {
      message: t('invalidCharacters'),
    });

  const phoneValidation = z
    .string()
    .min(1, { message: t('pleaseFillInThePhoneNumber') })
    .min(12, { message: t('yourPhoneNumberIsTooShort') })
    .regex(/^\+?[1-9]\d{0,2}[-\s]?\d{3}[-\s]?\d{3}[-\s]?\d{3,4}$/g, {
      message: t('invalidPhoneNumber'),
    });

  const cityValidation = z
    .string()
    .min(1, { message: t('pleaseFillInTheCity') })
    .min(3, { message: t('yourCityNameIsTooShort') })
    .max(100, { message: t('yourCityNameIsTooLong') })
    .regex(/^[\p{L}'-]+$/u, {
      message: t('invalidCharacters'),
    });

  const address1Validation = z
    .string()
    .min(1, { message: t('pleaseFillInTheStreetAddress') })
    .min(2, { message: t('yourStreetAddressIsTooShort') })
    .max(150, { message: t('yourStreetAddressIsTooLong') })
    .regex(/^(?!.*--)(?!.*\.\.)(?!.*,$)(?!.*\.$)[\p{L}\d\s\-.,]+$/u, {
      message: t('invalidCharacters'),
    });

  const address2Validation = z
    .string()
    .min(1, { message: t('pleaseFillInTheBuildingNumber') })
    .max(10, { message: t('yourBuildingNumberIsTooLong') })
    .regex(/^[0-9]+[\p{L}]?(\s?\/\s?[0-9\p{L}]+)?$/u, {
      message: t('invalidCharacters'),
    });

  const apartmentNumberValidation = z
    .string()
    .optional()
    .refine(value => !value || value.length <= 10, {
      message: t('yourApartmentNumberIsTooLong'),
    })
    .refine(
      value => !value || /^[a-zA-Zа-яА-ЯёЁіІїЇєЄ0-9\s\-\/#]+$/.test(value),
      {
        message: t('invalidCharacters'),
      }
    );

  const postCodeValidation = z
    .string()
    .min(1, { message: t('pleaseFillInThePostcode') })
    .regex(/^[A-Z0-9\s-]{3,10}$/i, {
      message: t('invalidPostcodeFormat'),
    });

  const companyValidation = z
    .string()
    .min(1, { message: t('pleaseFillInTheCorrectCompanyName') })
    .max(100, { message: t('yourCompanyNameIsTooLong') })
    .regex(/^(?!.*--)(?!.*\.\.)(?!.*,$)(?!.*\.$)[\p{L}\d\s\-.,]+$/u, {
      message: t('invalidCharacters'),
    });

  const nipValidation = z
    .string()
    .min(1, { message: t('pleaseFillInTheNip') })
    .regex(/^[0-9\-]{10,20}$/, {
      message: t('wrongNipFormat'),
    });

  console.log('isInvoice', isInvoice);
  const schema = z.object({
    first_name: firstNameValidation,
    last_name: lastNameValidation,
    email: z
      .string()
      .min(1, { message: t('pleaseFillInTheEmail') })
      .max(254, { message: t('cannotExceed254Characters') })
      .email({ message: t('wrongEmailFormat') }),
    phone: phoneValidation,
    country: z.string().min(1, t('pleaseSelectACountry')),
    city: cityValidation,
    address_1: address1Validation,
    address_2: address2Validation,
    apartmentNumber: apartmentNumberValidation,
    postcode: postCodeValidation,
    invoice: z.boolean().optional(),
    company: isInvoice ? companyValidation : z.string().optional(),
    nip: isInvoice ? nipValidation : z.string().optional(),
    shippingAddress: z.boolean().optional(),
    first_nameShipping: isShipping
      ? firstNameValidation
      : z.string().optional(),
    last_nameShipping: isShipping ? lastNameValidation : z.string().optional(),
    phoneShipping: isShipping ? phoneValidation : z.string().optional(),
    address_1Shipping: isShipping ? address1Validation : z.string().optional(),
    address_2Shipping: isShipping ? address2Validation : z.string().optional(),
    postcodeShipping: isShipping ? postCodeValidation : z.string().optional(),
    cityShipping: isShipping ? cityValidation : z.string().optional(),
    countryShipping: isShipping
      ? z.string().min(1, t('pleaseSelectACountry'))
      : z.string().optional(),
    apartmentNumberShipping: apartmentNumberValidation,
    newsletter: z.boolean().optional(),
  });

  return schema;
};
