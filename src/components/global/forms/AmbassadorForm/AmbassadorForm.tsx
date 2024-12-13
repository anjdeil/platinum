import { FC, useEffect, useMemo, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import 'react-international-phone/style.css'
import {
  FileUploadLabel,
  FileUploadPreview,
  FileUploadWrapper,
  InfoCard,
  OptionButton,
  OptionButtonsContainer,
  ProofSelect,
} from './styles'
import {
  CustomForm,
  FlexBox,
  FormWrapper,
  FormWrapperBottom,
  StyledButton,
} from '@/styles/components'
import { isAuthErrorResponseType } from '@/utils/isAuthErrorResponseType'
import { UserInfoFormSchema } from '@/types/components/global/forms/userInfoForm'
import { Title } from '@/styles/components'
import { useFetchCustomerQuery } from '@/store/rtk-queries/wooCustomApi'
import { CircularProgress } from '@mui/material'
import CustomSelect from '../../selects/CustomSelect/CustomSelect'
import { CustomFormInput } from '../CustomFormInput'
import { CustomError } from '../CustomFormInput/styles'
import { useTranslations } from 'next-intl'
import {
  AmbassadorFormType,
  AmbassadorFormValidationSchema,
} from '@/types/components/global/forms/ambassadorForm/ambassadorForm'
import {
  useSendAmbassadorFormMutation,
  useSendAnEmailMutation,
} from '@/store/rtk-queries/contactFrom7/contactFromApi7'
import { log } from 'console'

export const AmbassadorForm: FC = () => {
  // auth route
  /*   const router = useRouter();
    useEffect(() =>
        {
            if (isLoggedIn) router.push('/account');
        }, [router, isLoggedIn]); */

  const [hasChanges, setHasChanges] = useState<boolean>(false)

  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  // hard fetch user
  const {
    data: customer,
    error: customerError,
    isLoading: isCustomerLoading,
  } = useFetchCustomerQuery({ customerId: '14408' })

  const t = useTranslations('Contacts')
  const tValidation = useTranslations('Validation')

  const schema = AmbassadorFormValidationSchema(tValidation)
  const [sendForm, { isLoading, isError, isSuccess }] = useSendAmbassadorFormMutation()

  const SEND_AMBASSADOR_FORM_ID = Number(process.env.SEND_AMBASSADOR_FORM_ID)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
    watch,
  } = useForm<AmbassadorFormType>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
  })

  const onSubmit = async (data: AmbassadorFormType) => {
    console.log(file)

    const formData = new FormData()

    formData.append('_wpcf7_unit_tag', 'wpcf7-b970096-o1')
    formData.append('firstName', data.firstName)
    formData.append('lastName', data.lastName)
    formData.append('email', data.email)
    formData.append('phone', data.phoneNumber)
    formData.append('country', data.country)
    formData.append('city', data.city)
    formData.append('about', data.about)
    if (file) {
      formData.append('file', file)
    }

    try {
      await sendForm({ formId: 26923, formData }).unwrap()
    } catch (err) {
      console.error('Error sending question form', err)
    }
  }

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (type === 'change') {
        setHasChanges(true)
        console.log('hasChanges:', hasChanges)
      }
    })
    return () => subscription.unsubscribe()
  }, [watch])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0] || null
    setFile(uploadedFile)

    if (uploadedFile) {
      setPreview(URL.createObjectURL(uploadedFile))
    }
  }

  return (
    <CustomForm onSubmit={handleSubmit(onSubmit)} maxWidth="660px">
      <InfoCard>
        <Title
          as="h2"
          fontWeight={600}
          fontSize="24px"
          uppercase={true}
          marginBottom="16px"
        >
          application form
        </Title>
        {isCustomerLoading && !customer ? (
          <CircularProgress />
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
                padding="0"
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
                padding="0"
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
                padding="0"
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
                padding="0"
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
                padding="0"
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
                padding="0"
              />
            </FormWrapper>
            <FlexBox flexDirection="column" gap="16px">
              <CustomFormInput
                fieldName={tValidation('aboutYourself')}
                name="about"
                register={register}
                errors={errors}
                inputTag={'textarea'}
                inputType={'text'}
                setValue={setValue}
                padding="0"
              />

              <FileUploadWrapper>
                <FileUploadLabel htmlFor="file-upload">
                  {preview ? (
                    <FileUploadPreview>
                      <img src={preview} alt={tValidation('preview')} />
                    </FileUploadPreview>
                  ) : (
                    <>
                      <p>
                        <span>{tValidation('clickToUpload')} </span>&nbsp;
                        {tValidation('orDragAndDrop')} SVG, PNG, JPG {tValidation('or')}{' '}
                        GIF ({tValidation('max')} 800x400px)
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

              <FormWrapperBottom>
                <StyledButton type="submit" disabled={isSubmitting || !hasChanges}>
                  {isSubmitting ? tValidation('sending') : tValidation('sendButton')}
                </StyledButton>

                {isError && (
                  <CustomError
                    dangerouslySetInnerHTML={{ __html: isAuthErrorResponseType(errors) }}
                  ></CustomError>
                )}
              </FormWrapperBottom>
            </FlexBox>
          </>
        )}
      </InfoCard>
    </CustomForm>
  )
}
