import { useAppSelector } from '@/store';
import { useAddCommentMutation } from '@/store/rtk-queries/wooCustomApi';
import { StyledButton, Text } from '@/styles/components';
import {
  CommentFormSchema,
  CommentFormType,
} from '@/types/components/global/forms/commentForm';
import { SwiperPopupProps } from '@/types/components/global/sliders/productSwiper';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CustomFormInput } from '../../forms/CustomFormInput';
import CloseIcon from '../../icons/CloseIcon/CloseIcon';
import Rating from '../../Rating/Rating';
import {
  CloseWrapper,
  FormWrapper,
  PopupBody,
  PopupOverlay,
  StyledForm,
  StyledName,
} from './styles';

const CommentPopup: React.FC<SwiperPopupProps> = ({ onClose }) => {
  const handleClickBackground = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };
  const t = useTranslations('Product');
  const [rating, setRating] = useState<number>(0);

  const [AddCommentMutation] = useAddCommentMutation();

  const product = useAppSelector(
    useMemo(() => state => state.productSlice.data, [])
  );

  const user = useAppSelector(state => state.userSlice.user);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CommentFormType>({
    resolver: zodResolver(CommentFormSchema),
  });

  useEffect(() => {
    if (!user) {
      onClose();
    }
  }, [user, onClose]);

  async function onSubmit(formData: CommentFormType) {
    const data = {
      product_id: product?.id || 0,
      review: formData.comment,
      reviewer: `${user?.first_name} ${user?.last_name}`,
      reviewer_email: user?.email,
      rating,
      status: 'hold',
    };

    try {
      const response = await AddCommentMutation(data);
      if (response) {
        console.log(response);
        onClose();
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <PopupOverlay onClick={handleClickBackground}>
      <PopupBody>
        <CloseWrapper>
          <CloseIcon onClick={onClose} />
        </CloseWrapper>
        <FormWrapper>
          <StyledName>{`${user?.first_name} ${user?.last_name}`}</StyledName>
          <Rating rating={rating} onChange={setRating} />
          <Text textalign="center">
            {t('commentText1')}
            <br />
            {t('commentText2')}
          </Text>
          <StyledForm onSubmit={handleSubmit(onSubmit)}>
            <CustomFormInput
              fieldName={t('yourOpinion')}
              name="comment"
              placeholder={t('comment')}
              register={register}
              errors={errors}
              inputTag="textarea"
              inputType="text"
            />
            <StyledButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? `${t('submitting')}...` : t('addComment')}
            </StyledButton>
          </StyledForm>
        </FormWrapper>
      </PopupBody>
    </PopupOverlay>
  );
};

export default CommentPopup;
