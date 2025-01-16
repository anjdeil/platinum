import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  StyledError,
  StyledSubscribeButton,
  StyledSubscribeForm,
  StyledSubscribeInput,
  StyledSuccessMessage,
} from './styles';
import {
  SubscriptionFormProps,
  SubscriptionFormSchema,
  SubscriptionFormValues,
} from '@/types/components/global/forms/subscriptionForm';
import { useTranslations } from 'next-intl';
import { useSubscribeMutation } from '@/store/rtk-queries/mailpoetApi';

export const SubscribeForm: FC<SubscriptionFormProps> = ({}) => {
  const [subscribe, { isLoading }] = useSubscribeMutation();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const t = useTranslations('SubscriptionForm');

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    reset,
  } = useForm<SubscriptionFormValues>({
    resolver: zodResolver(SubscriptionFormSchema),
    mode: 'onChange',
  });

  const submitForm = async ({ email }: { email: string }) => {
    try {
      const response = await subscribe({ email }).unwrap();

      if (response.message === 'Subscribed') {
        setErrorMessage(null);
        setSuccessMessage(t('successSubscribe'));
        reset();
      } else if (response.message === 'User already subscribed') {
        setErrorMessage(null);
        setSuccessMessage(t('userAlreadySubscribed'));
        reset();
      } else {
        setErrorMessage(response.message || t('failedSubscribe'));
        setSuccessMessage(null);
      }
    } catch (err) {
      setErrorMessage((err as any).data?.message || t('failedSubscribe'));
      setSuccessMessage(null);
    } finally {
      setTimeout(() => {
        setErrorMessage(null);
        setSuccessMessage(null);
      }, 5000);
    }
  };

  const isError = !!errorMessage || !!errors;
  return (
    <StyledSubscribeForm onSubmit={handleSubmit(submitForm)}>
      <StyledSubscribeInput
        type="email"
        placeholder="name@gmail.com"
        {...register('email')}
        required
        isError={isError}
      />
      {errors.email && <StyledError>{t('typeValidEmail')}</StyledError>}
      {errorMessage && <StyledError>{errorMessage}</StyledError>}
      {successMessage && (
        <StyledSuccessMessage>{successMessage}</StyledSuccessMessage>
      )}
      <StyledSubscribeButton
        type="submit"
        disabled={!isValid || isSubmitting || isLoading}
      >
        {isSubmitting || isLoading ? t('sending') : t('subscribe')}
      </StyledSubscribeButton>
    </StyledSubscribeForm>
  );
};
