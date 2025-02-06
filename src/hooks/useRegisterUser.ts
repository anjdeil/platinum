import { useMemo, useState } from 'react';
import { useRegisterCustomerMutation } from '@/store/rtk-queries/wooCustomApi';
import {
  useCheckTokenMutation,
  useGetTokenMutation,
} from '@/store/rtk-queries/wpApi';
import { validateWooCustomer } from '@/utils/zodValidators/validateWooCustomer';
import { RegistrationFormSchema } from '@/types/components/global/forms/registrationForm';
import { useTranslations } from 'next-intl';
import { z } from 'zod';

export const useRegisterUser = () => {
  const [registerCustomerMutation] = useRegisterCustomerMutation();
  const [fetchToken] = useGetTokenMutation();
  const [checkToken] = useCheckTokenMutation();
  const [error, setError] = useState('');
  const tValidation = useTranslations('Validation');

  const formSchema = useMemo(
    () => RegistrationFormSchema(false, tValidation),
    []
  );
  type RegistrationFormType = z.infer<typeof formSchema>;

  const registerUser = async (registrationData: RegistrationFormType) => {
    setError('');
    if (!registrationData) return;

    try {
      /** Register a new customer */
      const resp = await registerCustomerMutation(registrationData);
      if (!resp.data) throw new Error('Invalid customer response.');

      /** Validate response */
      const isResponseValid = await validateWooCustomer(resp.data);
      if (!isResponseValid)
        throw new Error('Customer response data validation failed.');

      /** Fetch auth token */
      const tokenResp = await fetchToken({
        password: registrationData.password || '',
        username: registrationData.email,
      });
      if (!tokenResp.data) throw new Error('Auth token getting failed.');

      /** Validate auth token */
      const isTokenValid = await checkToken({});
      if (!isTokenValid) throw new Error('Auth token validation failed.');
    } catch (err) {
      setError(
        'Oops! Something went wrong with the server. Please try again or contact support.'
      );
    }
  };

  return { registerUser, error };
};
