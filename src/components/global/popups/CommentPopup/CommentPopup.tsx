import { useAppSelector } from '@/store';
import { useAddCommentMutation } from '@/store/rtk-queries/wooCustomApi';
import { StyledButton, Text } from '@/styles/components';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import CloseIcon from '../../icons/CloseIcon/CloseIcon';
import Rating from '../../Rating/Rating';
import {
  CloseWrapper,
  FormWrapper,
  PopupBody,
  PopupOverlay,
  StyledForm,
  StyledName,
  StyledRatingWrapper,
  TextFieldsWrapper,
} from './styles';
import { getValidationSchema } from '@/utils/getValidationSchema';
import {
  StyledError,
  StyledSuccessMessage,
} from '../../forms/NotifyPopupForm/styles';
import CustomTextField from '../../forms/CustomTextField/CustomTextField';
import CustomTextArea from '../../forms/CustomTextArea/CustomTextArea';

interface CommentPopupProps {
  onClose: () => void;
  data: Record<string, string | number>;
}

interface FormDataType {
  first_name: string;
  email: string;
  comment: string;
}

const CommentPopup: React.FC<CommentPopupProps> = ({ onClose }) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const t = useTranslations('Product');
  const tForms = useTranslations('Forms');
  const tValidation = useTranslations('Validation');
  const locale = useLocale();

  const [rating, setRating] = useState<number>(0);

  const [AddCommentMutation] = useAddCommentMutation();

  const product = useAppSelector(
    useMemo(() => state => state.productSlice.data, [])
  );

  const user = useAppSelector(state => state.userSlice.user);

  const handleClickBackground = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const validationSchema = useMemo(() => {
    return (name: string, watch?: any) =>
      getValidationSchema(name, tValidation, watch);
  }, [locale]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormDataType>({
    mode: 'onChange',
  });

  async function onSubmit(formData: FormDataType) {
    const preparedData = user
      ? `${user?.first_name} ${user?.last_name}`
      : formData.first_name;

    const data = {
      product_id: product?.id || 0,
      review: formData.comment,
      reviewer: preparedData,
      reviewer_email: user?.email || formData.email,
      rating,
      status: 'hold',
    };

    try {
      const response = await AddCommentMutation(data);
      setTimeout(() => {
        if (response) {
          console.log(response);
          onClose();
        }
      }, 3000);
    } catch (error) {
      console.error(error);
      setErrorMessage((error as any).data?.message || t('failedAddComment'));
      setSuccessMessage(null);
    } finally {
      setTimeout(() => {
        setErrorMessage(null);
        setSuccessMessage(null);
      }, 5000);
    }
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      setErrorMessage(null);
      setSuccessMessage(t('successAddComment'));
    }
  }, [isSubmitSuccessful]);

    return (
      <PopupOverlay onClick={handleClickBackground}>
        <PopupBody>
          <CloseWrapper>
            <CloseIcon onClick={onClose} />
          </CloseWrapper>
          <FormWrapper>
            {user ? (
              <StyledName>{`${user?.first_name} ${user?.last_name}`}</StyledName>
            ) : (
              <TextFieldsWrapper>
                <CustomTextField
                  name="first_name"
                  register={register}
                  inputType="text"
                  errors={errors}
                  label={tForms('first_name')}
                  validation={validationSchema('user_name')}
                  autocomplete="given-name"
                />
                <CustomTextField
                  name="email"
                  register={register}
                  inputType="email"
                  errors={errors}
                  label={tForms('email')}
                  validation={validationSchema('email')}
                  autocomplete="email"
                />
              </TextFieldsWrapper>
            )}
            <StyledRatingWrapper>
              <Rating
                rating={rating}
                onChange={setRating}
                width="24px"
                height="24px"
              />
            </StyledRatingWrapper>
            <StyledForm onSubmit={handleSubmit(onSubmit)}>
              <Text textalign="center">
                {t('commentText1')}
                <br />
                {t('commentText2')}
              </Text>
              <CustomTextArea
                name="comment"
                register={register}
                inputType="textarea"
                errors={errors}
                label={t('comment')}
                placeholder={t('yourOpinion')}
                validation={validationSchema('comment')}
                minHeight="121px"
              />
              <StyledButton
                type="submit"
                disabled={isSubmitting || rating === 0}
              >
                {isSubmitting ? `${t('submitting')}...` : t('addComment')}
              </StyledButton>
            </StyledForm>
            {errorMessage && (
              <StyledError isVisible={!!errorMessage}>
                {t('failedAddComment')}
              </StyledError>
            )}
            {successMessage && (
              <StyledSuccessMessage isVisible={!!successMessage}>
                {successMessage}
              </StyledSuccessMessage>
            )}
          </FormWrapper>
        </PopupBody>
      </PopupOverlay>
    );
};

export default CommentPopup;
