import { useState } from 'react';
import { useRegisterCustomerMutation } from '@/store/rtk-queries/wooCustomApi';
import {
  useCheckTokenMutation,
  useGetTokenMutation,
} from '@/store/rtk-queries/wpApi';
import { validateWooCustomer } from '@/utils/zodValidators/validateWooCustomer';
import { useTranslations } from 'next-intl';

import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { RegistrationFormType } from '@/types/components/global/forms/registrationForm';

export const useRegisterUser = () => {
  const [registerCustomerMutation] = useRegisterCustomerMutation();
  const [fetchToken] = useGetTokenMutation();
  const [checkToken] = useCheckTokenMutation();
  const [customError, setCustomError] = useState<string | null>(null);
  const tMyAcc = useTranslations('MyAccount');

  const registerUser = async (registrationData: RegistrationFormType) => {
    setCustomError(null);
    if (!registrationData) return;

    try {
      /** Register a new customer */
      const resp = await registerCustomerMutation(registrationData);

      // Check if there is an error in the response
      if ('error' in resp) {
        let errorMessage = tMyAcc('unknownError');

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
        setCustomError(tMyAcc('invalidResp'));
        return tMyAcc('invalidResp');
      }

      // Validate response
      const isResponseValid = await validateWooCustomer(resp.data);
      if (!isResponseValid) {
        const errorMessage = tMyAcc('dataFailed');
        setCustomError(errorMessage);
        return errorMessage;
      }

      // Fetch auth token
      const tokenResp = await fetchToken({
        password: registrationData.password || '',
        username: registrationData.email,
        rememberMe: true,
      });
      if (!tokenResp.data) {
        const errorMessage = tMyAcc('noToken');
        setCustomError(errorMessage);
        return errorMessage;
      }

      // Validate auth token
      const isTokenValid = await checkToken(true);
      if (!isTokenValid) {
        const errorMessage = tMyAcc('tokenFailed');
        setCustomError(errorMessage);
        return errorMessage;
      }
    } catch (err) {
      let errorMessage = tMyAcc('registrationError');

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
