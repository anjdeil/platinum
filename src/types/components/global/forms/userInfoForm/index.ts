import { z } from 'zod';

export const UserInfoFormSchema = (isShipping: boolean, t: any) => {
  const firstNameValidation = z
    .string()
    .min(1, { message: t('pleaseFillInTheFirstName') })
    .min(2, { message: t('yourFirstNameIsTooShort') })
    .max(50, { message: t('yourFirstNameIsTooLong') })
    .regex(/^[a-zA-Zа-яА-ЯёЁіІїЇєЄ'’-]+$/i, {
      message: t('invalidCharacters'),
    });

  const lastNameValidation = z
    .string()
    .min(1, { message: t('pleaseFillInTheLastName') })
    .min(2, { message: t('yourLastNameIsTooShort') })
    .max(50, { message: t('yourLastNameIsTooLong') })
    .regex(/^[a-zA-Zа-яА-ЯёЁіІїЇєЄ'’-]+$/i, {
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
    .regex(/^[a-zA-Zа-яА-ЯёЁіІїЇєЄ'’-]+(?:\s[a-zA-Zа-яА-ЯёЁіІїЇєЄ'’-]+)*$/, {
      message: t('invalidCharacters'),
    });

  const address1Validation = z
    .string()
    .min(1, { message: t('pleaseFillInTheStreetAddress') })
    .min(2, { message: t('yourStreetAddressIsTooShort') })
    .max(150, { message: t('yourStreetAddressIsTooLong') })
    .regex(
      /^(?!.*--)(?!.*\.\.)(?!.*,$)(?!.*\.$)[a-zA-Zа-яА-ЯёЁіІїЇєЄ\d\s\-.,]+$/,
      { message: t('invalidCharacters') }
    );

  const address2Validation = z
    .string()
    .min(1, { message: t('pleaseFillInTheBuildingNumber') })
    .max(10, { message: t('yourBuildingNumberIsTooLong') })
    .regex(
      /^[0-9]+[a-zA-Zа-яА-ЯёЁіІїЇєЄ]?(\s?\/\s?[0-9a-zA-Zа-яА-ЯёЁіІїЇєЄ]+)?$/,
      {
        message: t('invalidCharacters'),
      }
    );

  const apartmentNumberValidation = z
    .string()
    .max(10, { message: t('yourApartmentNumberIsTooLong') })
    .regex(/^[a-zA-Zа-яА-ЯёЁіІїЇєЄ0-9\s\-\/#]+$/, {
      message: t('invalidCharacters'),
    });

  const postCodeValidation = z
    .string()
    .min(1, { message: t('pleaseFillInThePostcode') })
    .regex(/^(\d{2}-\d{3}|\d{1}-\d{4}|\d{3}-\d{2}|\d{5})$/, {
      message: t('invalidPostcodeFormat'),
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
    address_2: address2Validation,
    apartmentNumber: apartmentNumberValidation,
    postcode: postCodeValidation,
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
    apartmentNumberShipping: isShipping
      ? apartmentNumberValidation
      : z.string().optional(),
  });

  return schema;
};
