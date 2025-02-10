export const getValidationSchema = (
  name: string,
  t: any,
  watch?: (name: string) => any
) => {
  switch (name) {
    case 'first_name':
      return {
        required: t('pleaseFillInTheFirstName'),
        minLength: {
          value: 2,
          message: t('yourFirstNameIsTooShort'),
        },
        maxLength: {
          value: 50,
          message: t('yourFirstNameIsTooLong'),
        },
      };
    case 'last_name':
      return {
        required: t('pleaseFillInTheLastName'),
        minLength: {
          value: 2,
          message: t('yourLastNameIsTooShort'),
        },
        maxLength: {
          value: 50,
          message: t('yourLastNameIsTooLong'),
        },
      };
    case 'email':
      return {
        required: t('pleaseFillInTheEmail'),
        pattern: {
          value: /^(?!['`])\s*[-+.'\w]+@[-.\w]+\.[-.\w]+\s*$/gm,
          message: t('wrongEmailFormat'),
        },
        maxLength: {
          value: 254,
          message: t('cannotExceed254Characters'),
        },
      };
    case 'phone':
      return {
        required: t('pleaseFillInThePhoneNumber'),
        minLength: {
          value: 12,
          message: t('yourPhoneNumberIsTooShort'),
        },
        pattern: {
          value: /^\+?[1-9]\d{0,2}[-\s]?\d{3}[-\s]?\d{3}[-\s]?\d{3,4}$/g,
          message: t('invalidPhoneNumber'),
        },
      };
    case 'company':
      return {
        required: t('pleaseFillInTheCompanyName'),
        minLength: {
          value: 2,
          message: t('yourCompanyNameIsTooShort'),
        },
        maxLength: {
          value: 100,
          message: t('yourCompanyNameIsTooLong'),
        },
      };
    case 'nip':
      return {
        required: t('pleaseFillInTheNip'),
        minLength: {
          value: 10,
          message: t('yourNipIsTooShort'),
        },
        maxLength: {
          value: 20,
          message: t('yourNipIsTooLong'),
        },
        pattern: {
          value: /^[0-9\\-]*$/,
          message: t('invalidNipFormat'),
        },
      };
    case 'country':
      return {
        required: t('pleaseSelectACountry'),
      };
    case 'city':
      return {
        required: t('pleaseFillInTheCity'),
        minLength: {
          value: 3,
          message: t('yourCityNameIsTooShort'),
        },
        maxLength: {
          value: 100,
          message: t('yourCityNameIsTooLong'),
        },
      };
    case 'address_1':
      return {
        required: t('pleaseFillInTheStreetAddress'),
        minLength: {
          value: 5,
          message: t('yourStreetAddressIsTooShort'),
        },
        maxLength: {
          value: 100,
          message: t('yourStreetAddressIsTooLong'),
        },
      };
    case 'address_2':
      return {
        required: t('pleaseFillInTheBuildingNumber'),
        maxLength: {
          value: 100,
          message: t('yourBuildingNumberIsTooLong'),
        },
      };
    case 'apartmentNumber':
      return {
        maxLength: {
          value: 10,
          message: t('yourApartmentNumberIsTooLong'),
        },
      };
    case 'postcode':
      return {
        required: t('pleaseFillInThePostcode'),
        pattern: {
          value: /^[0-9]{5}$/,
          message: t('invalidPostcodeFormat'),
        },
      };
    case 'password':
      return {
        required: t('pleaseFillInThePassword'),
        minLength: {
          value: 8,
          message: t('minChar', { count: 8 }),
        },
        maxLength: {
          value: 25,
          message: t('yourPasswordIsTooLong'),
        },
        validate: {
          hasUpperCase: (value: string) =>
            /[A-Z]/.test(value) || t('PasswordCapitalLetter'),
          hasLowerCase: (value: string) =>
            /[a-z]/.test(value) || t('PasswordLowercaseLetter'),
          hasDigit: (value: string) =>
            /[0-9]/.test(value) || t('PasswordDigit'),
          hasSpecialChar: (value: string) =>
            /[^A-Za-z0-9]/.test(value) || t('PasswordSpecialChar'),
        },
      };
    case 'confirm_password':
      return {
        required: t('pleaseConfirmYourPassword'),
        minLength: {
          value: 8,
          message: t('minChar', { count: 8 }),
        },
        maxLength: {
          value: 25,
          message: t('yourPasswordIsTooLong'),
        },
        validate: (value: string) =>
          value === watch?.('password') || t('PasswordsDoNotMatch'),
      };
    case 'terms':
      return {
        required: t('agreentmentTerms'),
      };
    default:
      return {};
  }
};
