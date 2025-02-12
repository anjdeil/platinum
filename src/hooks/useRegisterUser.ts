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
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export const useRegisterUser = () => {
  const [registerCustomerMutation] = useRegisterCustomerMutation();
  const [fetchToken] = useGetTokenMutation();
  const [checkToken] = useCheckTokenMutation();
  const [customError, setCustomError] = useState<string | null>(null);
  const tValidation = useTranslations('Validation');

  const formSchema = useMemo(
    () => RegistrationFormSchema(false, tValidation),
    []
  );
  type RegistrationFormType = z.infer<typeof formSchema>;

  const registerUser = async (registrationData: RegistrationFormType) => {
    setCustomError(null);
    if (!registrationData) return;

    try {
      /** Register a new customer */
      const resp = await registerCustomerMutation(registrationData);

      // Check if there is an error in the response
      if ('error' in resp) {
        let errorMessage = 'Unknown server error';

        // If the error is an object of type FetchBaseQueryError, try to get the `message`
        if ((resp.error as FetchBaseQueryError)?.data) {
          const errorData = resp.error as FetchBaseQueryError;
          errorMessage = (errorData.data as any)?.message || errorMessage;
        }

        setCustomError(errorMessage);
        return errorMessage;
      }

      // Check if there is data
      if (!resp.data) {
        setCustomError('Invalid customer response.');
        return 'Invalid customer response.';
      }

      // Validate response
      const isResponseValid = await validateWooCustomer(resp.data);
      if (!isResponseValid) {
        const errorMessage = 'Customer response data validation failed.';
        setCustomError(errorMessage);
        return errorMessage;
      }

      // Fetch auth token
      const tokenResp = await fetchToken({
        password: registrationData.password || '',
        username: registrationData.email,
      });
      if (!tokenResp.data) {
        const errorMessage = 'Auth token getting failed.';
        setCustomError(errorMessage);
        return errorMessage;
      }

      // Validate auth token
      const isTokenValid = await checkToken({});
      if (!isTokenValid) {
        const errorMessage = 'Auth token validation failed.';
        setCustomError(errorMessage);
        return errorMessage;
      }
    } catch (err) {
      let errorMessage =
        'Oops! Something went wrong with the server. Please try again or contact support.';

      if (err instanceof Error) {
        errorMessage = err.message;
      } else if (typeof err === 'object' && err !== null && 'data' in err) {
        const errorData = err as { data?: { message?: string } };
        errorMessage = errorData.data?.message || errorMessage;
      }

      setCustomError(errorMessage);
      return errorMessage;
    }
  };

  return { registerUser, customError };
};
