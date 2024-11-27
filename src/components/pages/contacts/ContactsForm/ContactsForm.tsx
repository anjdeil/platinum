import React from "react";
import { FormButton, FormInput, FormTextarea, FormTitle, FormWrapper } from "./style";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { CustomFormInput } from "@/components/global/forms/CustomFormInput";


const ContactsForm = () => {


    const t = useTranslations('Cart');


    const { register, handleSubmit, formState: { errors }, setValue } = useForm();


    /*     const [couponState, setCouponState] = useState<'success' | 'error' | null>(null); */

    const onSubmit = (data: any) => {

    };

    return (

        <FormWrapper>
            <FormTitle>ASK US A QUESTION</FormTitle>
            <CustomFormInput
                label={false}
                name="couponCode"
                register={register}
                errors={errors}
                inputTag="input"
                inputType="text"
                setValue={setValue}
                /*   placeholder={t('CouponInputPlaceholder')} */
                placeholder={'What is your name'}
                height="28px"
            />
            <FormInput type="text" placeholder="What is your name" />
            <FormInput type="email" placeholder="Email" />
            <FormTextarea placeholder="Write your question" rows={5} />
            <FormButton>Send a question</FormButton>
        </FormWrapper>

    );
};

export default ContactsForm;
