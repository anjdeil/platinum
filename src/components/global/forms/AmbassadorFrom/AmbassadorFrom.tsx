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
import { getUserFromLocalStorage } from '@/utils/auth/userLocalStorage';
import CustomCountrySelect from '../../selects/CustomCountrySelect/CustomCountrySelect';
import { countryOptions } from '@/utils/mockdata/countryOptions';

export const AmbassadorForm: FC = () => {
  const [hasChanges, setHasChanges] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [fileErr, setFileErr] = useState<string>();
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [serverError, setServerError] = useState<boolean | undefined>();

  const t = useTranslations('Contacts');
  const tForms = useTranslations('Forms');
  const tValidation = useTranslations('Validation');
  const tMyAccount = useTranslations('MyAccount');

  useEffect(() => {
    const user = getUserFromLocalStorage();
    if (user?.id) {
      setUserId(user.id);
    }
  }, []);

  const schema = AmbassadorFormValidationSchema(tValidation);
  const [sendForm, { isLoading, isError, isSuccess }] =
    useSendAmbassadorFormMutation();

  const SEND_AMBASSADOR_FORM_ID = 26923;

  const ALLOWED_FILE_TYPES = [
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/svg+xml',
    'image/gif',
    'application/pdf',
  ];

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    control,
  } = useForm<AmbassadorFormType>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
  });

  const { data: customer, isLoading: isCustomerLoading } =
    useFetchCustomerQuery({ customerId: userId || '' }, { skip: !userId });

  const onSubmit = async (data: AmbassadorFormType) => {
    const formData = new FormData();

    formData.append('_wpcf7_unit_tag', 'wpcf7-b970096-o1');
    formData.append('firstName', data.first_name);
    formData.append('lastName', data.last_name);
    formData.append('email', data.email);
    formData.append('phone', data.phone);
    formData.append('country', data.country);
    formData.append('city', data.city);
    formData.append('about', data.about);

    if (file) {
      formData.append('file', file);
    }

    try {
      const response = await sendForm({
        formId: SEND_AMBASSADOR_FORM_ID,
        formData,
      }).unwrap();

      if (response.status !== 'mail_sent') {
        setServerError(true);
      }

      setValue('about', '');
      setFile(null);
      setPreview(null);
      setHasChanges(false);
    } catch (err) {
      console.error('Error sending form', err);
    }
  };

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (type === 'change') {
        setHasChanges(true);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  useEffect(() => {
    if (customer) {
      setValue('country', customer?.billing?.country);
    }
  }, [customer, setValue]);

  const MAX_FILE_SIZE = 3 * 1024 * 1024;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0] || null;
    validateAndSetFile(uploadedFile);
  };

  const validateAndSetFile = (uploadedFile: File | null) => {
    if (uploadedFile) {
      if (!ALLOWED_FILE_TYPES.includes(uploadedFile.type)) {
        setFileErr(tValidation('invalidFileType'));
        return;
      }
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

  const renderFormInfoFields = (
    prefix: string = '',
    defaultValues: any = {}
  ) => (
    <>
      {['first_name', 'last_name', 'email', 'phone'].map(field => (
        <CustomFormInput
          key={field}
          fieldName={tMyAccount(field)}
          name={`${prefix}${field}`}
          register={register}
          errors={errors}
          inputTag="input"
          inputType={field === 'phone' ? 'phone' : 'text'}
          defaultValue={
            field === 'phone'
              ? customer?.billing?.phone
              : defaultValues[field] || ''
          }
          setValue={setValue}
        />
      ))}
      <CustomCountrySelect
        name={`country${prefix}`}
        control={control}
        options={countryOptions}
        label={tMyAccount('country')}
        errors={errors}
        defaultValue={
          prefix === 'Shipping'
            ? customer?.shipping?.country
            : customer?.billing?.country
        }
        noBottom={true}
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
    </>
  );

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
        {isCustomerLoading ? (
          <FlexBox
            justifyContent="center"
            alignItems="center"
            margin="50px 0 0 0 "
          >
            <CircularProgress />
          </FlexBox>
        ) : (
          <>
            <FormWrapper paddingBottom="16px">
              {renderFormInfoFields('', customer)}
            </FormWrapper>
            <FlexBox flexDirection="column" gap="16px">
              <CustomFormInput
                fieldName={tValidation('aboutYourself')}
                name="about"
                placeholder={tValidation('aboutYourselfPlaceholder')}
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
                  {preview &&
                  ALLOWED_FILE_TYPES.slice(0, 5).includes(file?.type || '') ? (
                    <FileUploadPreview>
                      <img src={preview} alt={tValidation('preview')} />
                    </FileUploadPreview>
                  ) : file ? (
                    <p>{file.name}</p>
                  ) : (
                    <>
                      <UploadIcon />
                      <p>
                        <span>{tValidation('clickToUpload')} </span>&nbsp;
                        {tValidation('orDragAndDrop')} SVG, PNG, JPG, PDF{' '}
                        {tValidation('or')} GIF ({tValidation('max')}&nbsp;3 mB)
                      </p>
                    </>
                  )}
                </FileUploadLabel>

                <input
                  id="file-upload"
                  type="file"
                  accept=".pdf, .png, .jpg, .jpeg, .svg, .gif"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
                <CustomError> {fileErr}</CustomError>
              </FileUploadWrapper>

              <FormWrapperBottom margin="none" gap="0">
                <StyledButton
                  type="submit"
                  disabled={isSubmitting || !hasChanges}
                >
                  {isSubmitting
                    ? tValidation('sending')
                    : tValidation('sendButton')}
                </StyledButton>
                {isSuccess && !isLoading && !serverError && (
                  <SuccessMessage>{t('successMessage')}</SuccessMessage>
                )}
                {(isError || serverError) && (
                  <CustomError>{t('errorMessage')}</CustomError>
                )}
              </FormWrapperBottom>
            </FlexBox>
          </>
        )}
      </InfoCard>
    </CustomForm>
  );
};
