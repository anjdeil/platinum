import {
  apartmentRegex,
  cityRegex,
  emailRegex,
  nameRegex,
  nipRegex,
  phoneRegex,
  postcodeRegex,
  streetRegex,
} from './validation';

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
        pattern: {
          value: nameRegex,
          message: t('nameRegex'),
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
        pattern: {
          value: nameRegex,
          message: t('nameRegex'),
        },
      };
    case 'email':
      return {
        required: t('pleaseFillInTheEmail'),
        pattern: {
          value: emailRegex,
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
          value: phoneRegex,
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
          value: nipRegex,
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
        pattern: {
          value: cityRegex,
          message: t('cityRegex'),
        },
      };
    case 'address_1':
      return {
        required: t('pleaseFillInTheStreetAddress'),
        minLength: {
          value: 2,
          message: t('yourStreetAddressIsTooShort'),
        },
        maxLength: {
          value: 150,
          message: t('yourStreetAddressIsTooLong'),
        },
        pattern: {
          value: streetRegex,
          message: t('invalidCharacters'),
        },
      };
    case 'street_building':
      return {
        required: t('pleaseFillInTheStreetBuildingAddress'),
        minLength: {
          value: 3,
          message: t('yourStreetAddressIsTooShort'),
        },
        maxLength: {
          value: 150,
          message: t('yourStreetAddressIsTooLong'),
        },
        pattern: {
          value: streetRegex,
          message: t('invalidCharacters'),
        },
      };
    case 'address_2':
      return {
        required: t('pleaseFillInTheBuildingNumber'),
        maxLength: {
          value: 10,
          message: t('yourBuildingNumberIsTooLong'),
        },
        pattern: {
          value: streetRegex,
          message: t('invalidCharacters'),
        },
      };
    case 'apartmentNumber':
      return {
        maxLength: {
          value: 10,
          message: t('yourApartmentNumberIsTooLong'),
        },
        pattern: {
          value: apartmentRegex,
          message: t('invalidCharacters'),
        },
      };
    case 'apartmentNumberRequired':
      return {
        required: t('pleaseFillInTheApartmentNumber'),
        maxLength: {
          value: 10,
          message: t('yourApartmentNumberIsTooLong'),
        },
        pattern: {
          value: apartmentRegex,
          message: t('invalidCharacters'),
        },
      };
    case 'postcode':
      return {
        required: t('pleaseFillInThePostcode'),
        pattern: {
          value: postcodeRegex,
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
    case 'user_name':
      return {
        required: t('pleaseFillInTheUserName'),
        minLength: {
          value: 2,
          message: t('yourUserNameIsTooShort'),
        },
        maxLength: {
          value: 50,
          message: t('yourUserNameIsTooLong'),
        },
      };
    case 'comment':
      return {
        required: t('pleaseFillTheCommentField'),
        minLength: {
          value: 2,
          message: t('yourCommentIsTooShort'),
        },
        maxLength: {
          value: 600,
          message: t('yourCommentIsTooLong'),
        },
      };
    default:
      return {};
  }
};
