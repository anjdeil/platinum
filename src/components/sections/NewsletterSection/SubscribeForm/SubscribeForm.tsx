import { FC, useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { useSendAnEmailMutation } from '@/store/contactForm7/contactForm7Api';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  StyledError,
  StyledSubscribeButton,
  StyledSubscribeForm,
  StyledSubscribeInput,
} from './styles';
import {
  SubscriptionFormProps,
  SubscriptionFormSchema,
  SubscriptionFormValues,
} from '@/types/components/global/forms/subscriptionForm';
import { useTranslations } from 'next-intl';

export const SubscribeForm: FC<SubscriptionFormProps> = ({ formId }) => {
  const [sendAnEmail, { isError, error, data }] = useSendAnEmailMutation();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const t = useTranslations('SubscriptionForm');
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SubscriptionFormValues>({
    resolver: zodResolver(SubscriptionFormSchema),
  });

  const submitForm = async ({ email }: { email: string }) => {
    const formData = {
      _wpcf7_unit_tag: '???????????',
      email,
    };

    try {
      const response = await sendAnEmail({ formId, formData });
      if (response && 'data' in response) {
        reset();
        setErrorMessage(null);
      }
    } catch (err) {
      setErrorMessage((err as any).data?.message || t('failedToSendEmail'));
    }
  };

  return (
    <StyledSubscribeForm onSubmit={handleSubmit(submitForm)} style={{}}>
      <StyledSubscribeInput
        type='email'
        placeholder='name@gmail.com'
        {...register('email')}
        required
      />
      {errors.email && <StyledError>{errors.email?.message}</StyledError>}
      {errorMessage && <StyledError>{errorMessage}</StyledError>}
      <StyledSubscribeButton type='submit'>Subscribe</StyledSubscribeButton>
    </StyledSubscribeForm>
  );
};
