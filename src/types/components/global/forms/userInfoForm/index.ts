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
    .min(1, { message: t('pleaseFillInTheStreetBuildingAddress') })
    .min(3, { message: t('yourStreetAddressIsTooShort') })
    .max(150, { message: t('yourStreetAddressIsTooLong') })
    .regex(/^(?!.*([\-.,/\s])\1)[\p{L}\d\s\-.,/]+$/u, {
      message: t('invalidCharacters'),
    });

  const apartmentNumberValidation = z
    .string({
      required_error: t('pleaseFillInTheApartmentNumber'),
    })
    .min(1, { message: t('pleaseFillInTheApartmentNumber') }) // для required
    .max(10, { message: t('yourApartmentNumberIsTooLong') })
    .regex(/^(?=.*[\p{L}0-9])[ \p{L}0-9\-\/#]+$/u, {
      message: t('invalidCharacters'),
    });

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
    address_2: apartmentNumberValidation,
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
    address_2Shipping: isShipping
      ? apartmentNumberValidation
      : z.string().optional(),
    postcodeShipping: isShipping ? postCodeValidation : z.string().optional(),
    cityShipping: isShipping ? cityValidation : z.string().optional(),
    countryShipping: isShipping
      ? z.string().min(1, t('pleaseSelectACountry'))
      : z.string().optional(),
    newsletter: z.boolean().optional(),
  });

  return schema;
};
