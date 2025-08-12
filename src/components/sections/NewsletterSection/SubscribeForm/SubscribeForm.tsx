import { useSubscribeMutation } from '@/store/rtk-queries/mailsterApi';
import {
  SubscriptionFormProps,
  SubscriptionFormSchema,
  SubscriptionFormValues,
} from '@/types/components/global/forms/subscriptionForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  StyledError,
  StyledSubscribeButton,
  StyledSubscribeForm,
  StyledSubscribeInput,
  StyledSuccessMessage,
} from './styles';

export const SubscribeForm: FC<SubscriptionFormProps> = ({}) => {
  const [subscribe, { isLoading }] = useSubscribeMutation();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSuccessMessageShown, setIsSuccessMessageShown] = useState(false);
  const router = useRouter();
  const lang = router.locale || 'pl';

  const t = useTranslations('SubscriptionForm');

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    reset,
  } = useForm<SubscriptionFormValues>({
    resolver: zodResolver(SubscriptionFormSchema),
    mode: 'onBlur',
  });

  const submitForm = async ({ email }: { email: string }) => {
    try {
      const response = await subscribe({ email, lang }).unwrap();

      if (response.message === 'Subscribed') {
        setErrorMessage(null);
        setIsSuccessMessageShown(true);
        setSuccessMessage(t('successSubscribe'));
        reset();
      } else if (response.message === 'User already subscribed') {
        setErrorMessage(null);
        setIsSuccessMessageShown(true);
        setSuccessMessage(t('userAlreadySubscribed'));
        reset();
      } else {
        setErrorMessage(response.message || t('failedSubscribe'));
        setIsSuccessMessageShown(false);
        setSuccessMessage(null);
      }
    } catch (err) {
      setErrorMessage((err as any).data?.message || t('failedSubscribe'));
      setIsSuccessMessageShown(false);
      setSuccessMessage(null);
    } finally {
      setTimeout(() => {
        setErrorMessage(null);
        setIsSuccessMessageShown(false);
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

      <StyledSubscribeButton
        type="submit"
        disabled={
          !isValid || isSubmitting || isLoading || isSuccessMessageShown
        }
        isdisabled={isSuccessMessageShown}
      >
        {isSubmitting || isLoading ? t('sending') : t('subscribe')}
      </StyledSubscribeButton>

      {successMessage && (
        <StyledSuccessMessage>{successMessage}</StyledSuccessMessage>
      )}
    </StyledSubscribeForm>
  );
};
