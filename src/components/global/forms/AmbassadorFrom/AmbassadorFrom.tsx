import { FC, useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import 'react-international-phone/style.css';
import {
  FileUploadLabel,
  FileUploadPreview,
  FileUploadWrapper,
} from './styles';
import {
  CustomForm,
  FlexBox,
  FormWrapper,
  FormWrapperBottom,
  InfoCard,
  StyledButton,
} from '@/styles/components';
import { isAuthErrorResponseType } from '@/utils/isAuthErrorResponseType';
import { Title } from '@/styles/components';
import { useFetchCustomerQuery } from '@/store/rtk-queries/wooCustomApi';
import { CircularProgress } from '@mui/material';
import { CustomFormInput } from '../CustomFormInput';
import { CustomError } from '../CustomFormInput/styles';
import { useTranslations } from 'next-intl';
import { useSendAmbassadorFormMutation } from '@/store/rtk-queries/contactFrom7/contactFromApi7';
import UploadIcon from '../../icons/UploadIcon/UploadIcon';
import {
  AmbassadorFormType,
  AmbassadorFormValidationSchema,
} from '@/types/components/global/forms/ambassadorFrom';
import { SuccessMessage } from '@/components/pages/contacts/ContactsForm/style';

export const AmbassadorForm: FC = () => {
  const [hasChanges, setHasChanges] = useState<boolean>(false);

  const [file, setFile] = useState<File | null>(null);
  const [fileErr, setFileErr] = useState<string>();
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const { data: customer, isLoading: isCustomerLoading } =
    useFetchCustomerQuery({ customerId: '14408' });

  const t = useTranslations('Contacts');
  const tForms = useTranslations('Forms');
  const tValidation = useTranslations('Validation');

  const schema = AmbassadorFormValidationSchema(tValidation);
  const [sendForm, { isLoading, isError, isSuccess }] =
    useSendAmbassadorFormMutation();

  const SEND_AMBASSADOR_FORM_ID = 26923;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<AmbassadorFormType>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: AmbassadorFormType) => {
    console.log('Form data:', data);

    const formData = {
      _wpcf7_unit_tag:
        process.env.NEXT_PUBLIC_SEND_AMBASSADOR_FORM_WPCF7_UNIT_TAG,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phoneNumber,
      country: data.country,
      city: data.city,
      about: data.about,
      file: '',
    };

    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64File = reader.result as string;
        formData.file = base64File;
        try {
          console.log('Sending form data...');
          await sendForm({
            formId: SEND_AMBASSADOR_FORM_ID,
            formData,
          }).unwrap();
          setValue('about', '');
          setFile(null);
          setPreview(null);
          setHasChanges(false);
        } catch (err) {
          console.error('Error sending question form', err);
        }
      };
      reader.readAsDataURL(file);
    } else {
      try {
        console.log('Sending form data...');
        await sendForm({ formId: SEND_AMBASSADOR_FORM_ID, formData }).unwrap();
        setValue('about', '');
        setHasChanges(false);
      } catch (err) {
        console.error('Error sending question form', err);
      }
    }
  };

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (type === 'change') {
        setHasChanges(true);
        console.log('hasChanges:', hasChanges);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const MAX_FILE_SIZE = 3 * 1024 * 1024;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0] || null;
    validateAndSetFile(uploadedFile);
  };

  const validateAndSetFile = (uploadedFile: File | null) => {
    if (uploadedFile) {
      if (uploadedFile.size > MAX_FILE_SIZE) {
        setFileErr(tValidation('fileTooLarge'));
        return;
      }
      setFile(uploadedFile);
      setPreview(URL.createObjectURL(uploadedFile));
      setFileErr('');
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const uploadedFile = e.dataTransfer.files?.[0] || null;
    validateAndSetFile(uploadedFile);
  };

  return (
    <CustomForm onSubmit={handleSubmit(onSubmit)} maxWidth="800px">
      <InfoCard>
        <Title
          as="h2"
          fontWeight={600}
          fontSize="24px"
          uppercase={true}
          marginBottom="16px"
        >
          {tForms('applicationForm')}
        </Title>
        {isCustomerLoading && !customer ? (
          <FlexBox
            justifyContent="center"
            alignItems="center"
            margin="50px 0 0 0 "
          >
            <CircularProgress />
          </FlexBox>
        ) : (
          <>
            <FormWrapper>
              <CustomFormInput
                fieldName={tValidation('name')}
                name="firstName"
                inputTag={'input'}
                inputType={'text'}
                register={register}
                errors={errors}
                defaultValue={customer?.first_name || ''}
                setValue={setValue}
              />
              <CustomFormInput
                fieldName={tValidation('lastName')}
                name="lastName"
                register={register}
                errors={errors}
                inputTag={'input'}
                inputType={'text'}
                defaultValue={customer?.last_name || ''}
                setValue={setValue}
              />
              <CustomFormInput
                fieldName={tValidation('email')}
                name="email"
                register={register}
                errors={errors}
                inputTag={'input'}
                inputType={'text'}
                defaultValue={customer?.email || ''}
                setValue={setValue}
              />
              <CustomFormInput
                fieldName={tValidation('phoneNumber')}
                name="phoneNumber"
                register={register}
                errors={errors}
                inputTag={'input'}
                inputType={'phone'}
                defaultValue={customer?.billing.phone || ''}
                setValue={setValue}
              />
              <CustomFormInput
                fieldName={tValidation('country')}
                name="country"
                register={register}
                errors={errors}
                inputTag={'input'}
                inputType={'text'}
                defaultValue={customer?.billing.country || ''}
                setValue={setValue}
              />
              <CustomFormInput
                fieldName={tValidation('city')}
                name="city"
                register={register}
                errors={errors}
                inputTag={'input'}
                inputType={'text'}
                defaultValue={customer?.billing.city || ''}
                setValue={setValue}
              />
            </FormWrapper>
            <FlexBox flexDirection="column" gap="16px">
              <CustomFormInput
                fieldName={tValidation('aboutYourself')}
                name="about"
                placeholder="Text about yourself"
                register={register}
                errors={errors}
                inputTag={'textarea'}
                inputType={'text'}
                setValue={setValue}
              />

              <FileUploadWrapper
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <FileUploadLabel htmlFor="file-upload" isDragging={isDragging}>
                  {preview ? (
                    <FileUploadPreview>
                      <img src={preview} alt={tValidation('preview')} />
                    </FileUploadPreview>
                  ) : (
                    <>
                      <UploadIcon />
                      <p>
                        <span>{tValidation('clickToUpload')} </span>&nbsp;
                        {tValidation('orDragAndDrop')} SVG, PNG, JPG{' '}
                        {tValidation('or')} GIF ({tValidation('max')} 800x400px,
                        3mb)
                      </p>
                    </>
                  )}
                </FileUploadLabel>
                <input
                  id="file-upload"
                  type="file"
                  accept=".svg, .png, .jpg, .gif"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
              </FileUploadWrapper>
              <CustomError> {fileErr}</CustomError>
              <FormWrapperBottom>
                <StyledButton
                  type="submit"
                  disabled={isSubmitting || !hasChanges}
                >
                  {isSubmitting
                    ? tValidation('sending')
                    : tValidation('sendButton')}
                </StyledButton>
                {isSuccess && !isLoading && (
                  <SuccessMessage>{t('successMessage')}</SuccessMessage>
                )}
                {isError && (
                  <CustomError
                    dangerouslySetInnerHTML={{
                      __html: isAuthErrorResponseType(errors),
                    }}
                  ></CustomError>
                )}
              </FormWrapperBottom>
            </FlexBox>
          </>
        )}
      </InfoCard>
    </CustomForm>
  );
};
