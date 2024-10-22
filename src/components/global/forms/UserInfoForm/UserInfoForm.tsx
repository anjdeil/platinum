import { FC, useEffect, useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import 'react-international-phone/style.css';
import { CustomInput } from "../CustomInput/CustomInput";
import { useRouter } from "next/router";
import { CustomForm, FormWrapper, FormWrapperBottom, InfoCard } from "./styles";
import { isAuthErrorResponseType } from "@/utils/isAuthErrorResponseType";
import { CustomError } from "../CustomInput/styles";
import { UserInfoFormSchema } from "@/types/components/global/forms/userInfoForm";
import { Title } from "@/styles/components";
import { useFetchCustomerQuery, useUpdateCustomerMutation } from "@/store/rtk-queries/wooCustomApi";

interface FormHandle {
    submit: () => void;
}

const isCheckout = false;
const isShipping = false;

export const UserInfoForm: FC = () => {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [isUpdate, setIsUpdate] = useState<boolean>(true);
    const [hasChanges, setHasChanges] = useState<boolean>(false);

    // hard fetch user
    const { data: customer, error: customerError } = useFetchCustomerQuery({ customerId: '14408' });

    const [UpdateCustomerMutation, { data, error, isLoading }] = useUpdateCustomerMutation();

    // initial form
    const formSchema = useMemo(() => UserInfoFormSchema(isLoggedIn, isUpdate, isShipping), [isLoggedIn, isUpdate, isShipping]);
    type UserInfoFormType = z.infer<typeof formSchema>;

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isSubmitSuccessful },
        setValue,
        reset,
        watch } = useForm<UserInfoFormType>({
           /*  resolver: zodResolver(formSchema) */
        });

    // initial value of form
    useEffect(() => {
        if (customer) {
            setValue('name', customer.first_name);
            setValue('lastName', customer.last_name);
            setValue('email', customer.email);
            setValue('country', customer.billing.country);
            setValue('city', customer.billing.city);
            setValue('address1', customer.billing.address_1);
            setValue('address2', customer.billing.address_2);
            setValue('postCode', customer.billing.postcode);
            setValue('phoneNumber', customer.billing.phone);
        }
    }, [customer, setValue]);

    // Track changes in the form
    useEffect(() => {
        const subscription = watch((value, { name, type }) => {
            if (type === 'change') {
                setHasChanges(true);
            }
        });
        return () => subscription.unsubscribe();
    }, [watch]);

    async function onSubmit(formData: UserInfoFormType) {
        console.log('submit');

        if (!customer) {
            console.error("Customer data is not available");
            return;
        }

        const data = {
            email: formData.email,
            first_name: formData.name,
            last_name: formData.lastName,
            role: 'customer',
            username: formData.email,
            billing: {
                first_name: formData.name,
                last_name: formData.lastName,
                address_1: formData.address1,
                address_2: formData.address2,
                city: formData.city,
                postcode: formData.postCode,
                country: formData.country,
                email: formData.email,
                phone: formData.phoneNumber,
            }
        }

        try {
            const response = await UpdateCustomerMutation({ id: customer.id, ...data });
            if (response)
                console.log(response);

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <CustomForm onSubmit={handleSubmit(onSubmit)}>
            <InfoCard>
                <Title as="h2" fontWeight={600} fontSize="34px" uppercase={true} marginBottom='16px'>
                    User information
                </Title>
                <FormWrapper>
                    <CustomInput
                        fieldName="Imię"
                        name='name'
                        register={register}
                        errors={errors}
                        inputTag={"input"}
                        inputType={"text"} />
                    <CustomInput
                        fieldName="Nazwisko"
                        name='lastName'
                        register={register}
                        errors={errors}
                        inputTag={"input"}
                        inputType={"text"} />
                    <CustomInput
                        fieldName="Adres e-mail"
                        name='email'
                        register={register}
                        errors={errors}
                        inputTag={"input"}
                        inputType={"text"} />
                    <CustomInput
                        fieldName="phone number"
                        name='phoneNumber'
                        register={register}
                        errors={errors}
                        setValue={setValue}
                        inputTag={"input"}
                        inputType={"text"} />
                    <CustomInput
                        fieldName="Kraj / region"
                        name='country'
                        register={register}
                        errors={errors}
                        inputTag={"input"}
                        inputType={"text"} />
                    <CustomInput
                        fieldName="Miasto"
                        name='city'
                        register={register}
                        errors={errors}
                        inputTag={"input"}
                        inputType={"text"} />
                    <CustomInput
                        fieldName="Ulica"
                        name='address1'
                        register={register}
                        errors={errors}
                        inputTag={"input"}
                        inputType={"text"} />
                    <CustomInput
                        fieldName="Building number"
                        name='address2'
                        register={register}
                        errors={errors}
                        inputTag={"input"}
                        inputType={"number"} />
                    <CustomInput
                        fieldName="№ apartment/office"
                        name='apartmentNumber'
                        register={register}
                        errors={errors}
                        inputTag={"input"}
                        inputType={"number"} />
                    <CustomInput
                        fieldName="Kod pocztowy"
                        name='postCode'
                        register={register}
                        errors={errors}
                        inputTag={"input"}
                        inputType={"number"} />
                </FormWrapper>
                <CustomInput
                    fieldName="I agree to receiving information regarding news and changes to the stores offer"
                    name='terms'
                    register={register}
                    errors={errors}
                    inputTag={"input"}
                    inputType={"checkbox"} />
            </InfoCard>
            <FormWrapperBottom>
            <button type="submit" disabled={isSubmitting || !hasChanges}>{isSubmitting ? 'Saving...' : 'Save changes'}</button>
                {error && <CustomError dangerouslySetInnerHTML={{ __html: isAuthErrorResponseType(error) }}></CustomError>}
            </FormWrapperBottom>
         
        </CustomForm>
    );
}
