import { useAppSelector } from "@/store";
import { useAddCommentMutation } from "@/store/rtk-queries/wooCustomApi";
import { StyledButton, Text } from "@/styles/components";
import { CommentFormSchema, CommentFormType } from "@/types/components/global/forms/commentForm";
import { SwiperPopupProps } from "@/types/components/global/sliders/productSwiper";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { CustomInput } from "../../forms/CustomInput";
import CloseIcon from "../../icons/CloseIcon/CloseIcon";
import Rating from "../../Rating/Rating";
import { CloseWrapper, FormWrapper, PopupBody, PopupOverlay, StyledForm, StyledName } from "./styles";

const CommentPopup: React.FC<SwiperPopupProps> = ({ onClose }) => {
    const handleClickBackground = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    }
    const t = useTranslations("Product");
    const [rating, setRating] = useState<number>(0); 
    
    const [AddCommentMutation, { data, error, isLoading }] = useAddCommentMutation();

    const product = useAppSelector(
        useMemo(() => (state) => state.productSlice.data, [])
    );

    const { register, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful }, setValue, reset } = useForm<CommentFormType>({
        resolver: zodResolver(CommentFormSchema)
    });    

    async function onSubmit(formData: CommentFormType)
    {
        const data = {
            product_id: product?.id || 0,
            review: formData.comment,
            reviewer: "Test",
            reviewer_email: "TestEmail",
            rating
        }

        try
        {
            const response = await AddCommentMutation(data);
            if (response) {
                console.log(response);
                onClose();
            }
        } catch (error)
        {
            console.error(error);
        }
    }

    return (
        <PopupOverlay onClick={handleClickBackground}>
            <PopupBody>               
                <CloseWrapper>
                    <CloseIcon  onClick={onClose}/>
                </CloseWrapper>
                <FormWrapper>
                    <StyledName>
                        Oleksandra Olashuk
                    </StyledName>
                    <Rating rating={rating} onChange={setRating} />
                    <Text textalign="center">
                        {t('commentText1')}<br />
                        {t('commentText2')}
                    </Text>
                    <StyledForm onSubmit={handleSubmit(onSubmit)}>
                        <CustomInput
                            fieldName="Your opinion"
                            name='comment'
                            placeholder="Comment"
                            register={register}
                            errors={errors}
                            isTextarea={true}
                        />
                        <StyledButton
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? `${t('submitting')}...` : t('addComment')}                            
                        </StyledButton>
                    </StyledForm>
                </FormWrapper>
            </PopupBody>
        </PopupOverlay>
    );
}

export default CommentPopup;