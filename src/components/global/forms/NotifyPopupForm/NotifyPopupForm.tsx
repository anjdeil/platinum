import { FC, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  StyledError,
  StyledNotifyButton,
  StyledNotifyForm,
  StyledSuccessMessage,
} from './styles';
import {} from '@/types/components/global/forms/subscriptionForm';
import { useLocale, useTranslations } from 'next-intl';
import CustomTextField from '../CustomTextField/CustomTextField';
import { getValidationSchema } from '@/utils/getValidationSchema';
import { useAppSelector } from '@/store';
import { useSubscribeMutation } from '@/store/rtk-queries/instockNotifier';

type FormDataType = {
  first_name: string;
  email: string;
};

interface NotifyPopupFormProps {
  data: Record<string, string | number>;
}
export const NotifyPopupForm: FC<NotifyPopupFormProps> = ({ data }) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const user = useAppSelector(state => state.userSlice.user);
  const t = useTranslations('Product');
  const tValidation = useTranslations('Validation');
  const tForms = useTranslations('Forms');
  const locale = useLocale();

  const [subscribe, { isLoading, isSuccess }] = useSubscribeMutation();

  const validationSchema = useMemo(() => {
    return (name: string, watch?: any) =>
      getValidationSchema(name, tValidation, watch);
  }, [locale]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    setValue,
  } = useForm<FormDataType>({
    mode: 'onChange',
  });

  useEffect(() => {
    if (user) {
      setValue('first_name', user.first_name || '', { shouldValidate: true });
      setValue('email', user.email, { shouldValidate: true });
    }
  }, [user]);

  useEffect(() => {
    if (isSuccess) {
      setErrorMessage(null);
      setSuccessMessage(t('successNotify'));
    }
  }, [isSuccess]);

  const submitForm = async (formData: FormDataType) => {
    const requestData = {
      subscriber_name: formData.first_name,
      email: formData.email,
      product_id: data.productId as number,
      variation_id: (data.variationId as number) || undefined,
      status: 'cwg_subscribed',
      subscriber_phone: user?.billing?.phone || 'phone-number',
      custom_quantity: '1',
    };

    try {
      await subscribe(requestData).unwrap();
    } catch (err) {
      setErrorMessage((err as any).data?.message || t('failedNotify'));
      setSuccessMessage(null);
    } finally {
      setTimeout(() => {
        setErrorMessage(null);
        setSuccessMessage(null);
      }, 5000);
    }
  };

  const translatedErrorMessage = (errorMessage: string) => {
    if (
      errorMessage === 'Seems like that email id has been already subscribed'
    ) {
      return t('userAlreadyNotified');
    }

    if (errorMessage === 'Valid Status required to perform your request') {
      return t('notValidData');
    }
    return t('failedNotify');
  };

  return (
    <StyledNotifyForm onSubmit={handleSubmit(submitForm)}>
      <CustomTextField
        name="first_name"
        register={register}
        inputType="text"
        errors={errors}
        label={tForms('first_name')}
        placeholder={tValidation('firstNamePlaceholder')}
        validation={validationSchema('user_name')}
        setValue={setValue}
        autocomplete="given-name"
      />
      <CustomTextField
        name="email"
        register={register}
        inputType="email"
        errors={errors}
        label={tForms('email')}
        placeholder={tValidation('emailPlaceholder')}
        validation={validationSchema('email')}
        setValue={setValue}
        autocomplete="email"
      />

      <StyledNotifyButton
        type="submit"
        disabled={!isValid || isSubmitting || isLoading}
      >
        {isSubmitting || isLoading ? t('sending') : t('notify')}
      </StyledNotifyButton>

      {errorMessage && (
        <StyledError isVisible={!!errorMessage}>
          {translatedErrorMessage(errorMessage)}
        </StyledError>
      )}
      {successMessage && (
        <StyledSuccessMessage isVisible={!!successMessage}>
          {t('successNotify')}
        </StyledSuccessMessage>
      )}
    </StyledNotifyForm>
  );
};
