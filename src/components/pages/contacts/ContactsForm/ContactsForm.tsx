import { CustomFormInput } from '@/components/global/forms/CustomFormInput';
import { useSendAnEmailMutation } from '@/store/rtk-queries/contactFrom7/contactFromApi7';
import { Title } from '@/styles/components';
import theme from '@/styles/theme';
import {
  ContactsFormType,
  ContactsFormValidationSchema,
} from '@/types/pages/contacts/ContactsForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import {
  ContactsStyledButton,
  ErrorMessage,
  FormWrapper,
  InputsWrapper,
  SuccessMessage,
} from './style';

const ContactsForm = () => {
  const t = useTranslations('Contacts');
  const tValidation = useTranslations('Validation');
  const schema = ContactsFormValidationSchema(tValidation);
  const [sendAnEmail, { isLoading, isError, isSuccess }] =
    useSendAnEmailMutation();

  const SEND_EMAIL_FORM_ID = 25798;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
  } = useForm<ContactsFormType>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
  });

  const onSubmit = async (data: ContactsFormType) => {
    try {
      const formData = {
        formId: SEND_EMAIL_FORM_ID,
        formData: {
          _wpcf7_unit_tag: 'wpcf7-2ac395a-o1',
          'your-name': data.name,
          'your-email': data.email,
          'your-message': data.question,
        },
      };

      await sendAnEmail(formData).unwrap();

      reset();
    } catch (err) {
      console.error('Error send question form', err);
    }
  };

  return (
    <FormWrapper>
      <Title as="h2" uppercase marginTop="12px">
        {t('askUsQuestion')}
      </Title>

      <form onSubmit={handleSubmit(onSubmit)}>
        <InputsWrapper>
          <CustomFormInput
            label={false}
            name="name"
            register={register}
            errors={errors}
            inputTag="input"
            inputType="text"
            setValue={setValue}
            placeholder={t('yourNamePlaceholder')}
            height="100%"
            background={theme.colors.white}
          />
          <CustomFormInput
            label={false}
            name="email"
            register={register}
            errors={errors}
            inputTag="input"
            inputType="text"
            setValue={setValue}
            placeholder={t('emailPlaceholder')}
            height="100%"
            background={theme.colors.white}
          />
        </InputsWrapper>
        <CustomFormInput
          label={false}
          name="question"
          register={register}
          errors={errors}
          inputTag="textarea"
          inputType="text"
          setValue={setValue}
          placeholder={t('yourQuestionPlaceholder')}
          background={theme.colors.white}
        />
        <ContactsStyledButton
          type="submit"
          disabled={isSubmitting || isLoading}
          width="100%"
          height="56px"
          color={theme.colors.white}
          hoverColor={theme.colors.primary}
          hoverBackgroundColor={theme.background.secondary}
        >
          {isSubmitting || isLoading ? t('sending') : t('sendButton')}
        </ContactsStyledButton>

        {isError && <ErrorMessage>{t('errorMessage')}</ErrorMessage>}

        {isSuccess && !isLoading && (
          <SuccessMessage>{t('successMessage')}</SuccessMessage>
        )}
      </form>
    </FormWrapper>
  );
};

export default ContactsForm;
