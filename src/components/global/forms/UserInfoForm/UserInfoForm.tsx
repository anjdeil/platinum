import { FC, useEffect, useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import 'react-international-phone/style.css';
import { CustomInput } from "../CustomInput/CustomInput";
import { useRouter } from "next/router";
import { InfoCard } from "./styles";
import { CustomForm, FormWrapper, FormWrapperBottom } from "@/styles/components";
import { isAuthErrorResponseType } from "@/utils/isAuthErrorResponseType";
import { CustomError } from "../CustomInput/styles";
import { UserInfoFormSchema } from "@/types/components/global/forms/userInfoForm";
import { Title } from "@/styles/components";
import { useFetchCustomerQuery, useUpdateCustomerMutation } from "@/store/rtk-queries/wooCustomApi";
import { CircularProgress } from "@mui/material";


const isUpdate = true;
const isCheckout = false;

export const UserInfoForm: FC = () => {

    // auth route
    /*   const router = useRouter();
    useEffect(() =>
        {
            if (isLoggedIn) router.push('/account');
        }, [router, isLoggedIn]); */

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [isShipping, setIsShipping] = useState<boolean>(true);
    const [hasChanges, setHasChanges] = useState<boolean>(true);

    // hard fetch user
    const { data: customer, error: customerError, isLoading: isCustomerLoading } = useFetchCustomerQuery({ customerId: '14408' });

    const [UpdateCustomerMutation,
        { data, error, isLoading }] = useUpdateCustomerMutation();

    const formSchema = useMemo(() => UserInfoFormSchema(isLoggedIn, isUpdate, isCheckout, isShipping),
        [isLoggedIn, isUpdate, isCheckout, isShipping]);
    type UserInfoFormType = z.infer<typeof formSchema>;

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isSubmitSuccessful },
        setValue,
        reset,
        watch } = useForm<UserInfoFormType>({
            resolver: zodResolver(formSchema)
        });

    useEffect(() => {
        const subscription = watch((value, { name, type }) => {
            if (type === 'change') {
                setHasChanges(true);
            }
        });
        return () => subscription.unsubscribe();
    }, [watch]);

    async function onSubmit(formData: UserInfoFormType) {

        if (!customer) {
            console.error("Customer data is not available");
            return;
        }

        const data = {
            email: formData.email,
            first_name: formData.name,
            last_name: formData.lastName,
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
            },
            shipping: isShipping ? {
                first_name: formData.name,
                last_name: formData.lastName,
                phone: formData.phoneNumber,
                address_1: formData.address1Shipping,
                address_2: formData.address2Shipping,
                city: formData.cityShipping,
                postcode: formData.postCodeShipping,
                country: formData.countryShipping,
            } : {
                first_name: formData.name,
                last_name: formData.lastName,
                phone: formData.phoneNumber,
                address_1: formData.address1,
                address_2: formData.address2,
                city: formData.city,
                postcode: formData.postCode,
                country: formData.country,
            },
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
        <CustomForm onSubmit={handleSubmit(onSubmit)} maxWidth='660px'>
            <InfoCard>
                <Title as="h2" fontWeight={600} fontSize="24px" uppercase={true} marginBottom='16px'>
                    User information
                </Title>
                {isCustomerLoading ?
                    <CircularProgress /> :
                    <FormWrapper>
                        <CustomInput
                            fieldName="Imię"
                            name='name'
                            inputTag={"input"}
                            inputType={"text"}
                            register={register}
                            errors={errors}
                            defaultValue={customer?.first_name}
                            setValue={setValue}
                        />
                        <CustomInput
                            fieldName="Nazwisko"
                            name='lastName'
                            register={register}
                            errors={errors}
                            inputTag={"input"}
                            inputType={"text"}
                            defaultValue={customer?.last_name}
                            setValue={setValue} />
                        <CustomInput
                            fieldName="Adres e-mail"
                            name='email'
                            register={register}
                            errors={errors}
                            inputTag={"input"}
                            inputType={"email"}
                            defaultValue={customer?.email}
                            setValue={setValue} />
                        <CustomInput
                            fieldName="phone number"
                            name='phoneNumber'
                            register={register}
                            errors={errors}
                            inputTag={"input"}
                            inputType={"tel"}
                            defaultValue={customer?.billing.phone}
                            setValue={setValue} />
                        <CustomInput
                            fieldName="Kraj / region"
                            name='country'
                            register={register}
                            errors={errors}
                            inputTag={"input"}
                            inputType={"text"}
                            defaultValue={customer?.billing.country}
                            setValue={setValue} />
                        <CustomInput
                            fieldName="Miasto"
                            name='city'
                            register={register}
                            errors={errors}
                            inputTag={"input"}
                            inputType={"text"}
                            defaultValue={customer?.billing.city}
                            setValue={setValue} />
                        <CustomInput
                            fieldName="Ulica"
                            name='address1'
                            register={register}
                            errors={errors}
                            inputTag={"input"}
                            inputType={"text"}
                            defaultValue={customer?.billing.address_1}
                            setValue={setValue} />
                        <CustomInput
                            fieldName="Building number"
                            name='address2'
                            register={register}
                            errors={errors}
                            inputTag={"input"}
                            inputType={"number"}
                            defaultValue={customer?.billing.address_2}
                            setValue={setValue} />
                        <CustomInput
                            fieldName="№ apartment/office"
                            name='apartmentNumber'
                            register={register}
                            errors={errors}
                            inputTag={"input"}
                            inputType={"number"}
                        /* defaultValue={'not exist in data'}
                        setValue={setValue} */
                        />
                        <CustomInput
                            fieldName="Kod pocztowy"
                            name='postCode'
                            register={register}
                            errors={errors}
                            inputTag={"input"}
                            inputType={"number"}
                            defaultValue={customer?.billing.postcode}
                            setValue={setValue} />
                    </FormWrapper>
                }


            </InfoCard>
            <InfoCard>
                <Title as="h2" fontWeight={600} fontSize="24px" uppercase={true} marginBottom='16px'>
                    Shipping information
                </Title>
                <CustomInput
                    fieldName="The same address as on customer information"
                    name='IsShipping'
                    onChange={(e) => setIsShipping(!e.target.checked)}
                    register={register}
                    errors={errors}
                    inputTag={"input"}
                    inputType={"checkbox"} />
                {isCustomerLoading ?
                    <CircularProgress /> :
                    <>

                        {isShipping &&
                            <FormWrapper>
                                <CustomInput
                                    fieldName="Kraj / region"
                                    name='countryShipping'
                                    register={register}
                                    errors={errors}
                                    inputTag={"input"}
                                    inputType={"text"}
                                    defaultValue={customer?.shipping.country}
                                    setValue={setValue} />
                                <CustomInput
                                    fieldName="Miasto"
                                    name='cityShipping'
                                    register={register}
                                    errors={errors}
                                    inputTag={"input"}
                                    inputType={"text"}
                                    defaultValue={customer?.shipping.city}
                                    setValue={setValue} />
                                <CustomInput
                                    fieldName="Ulica"
                                    name='address1Shipping'
                                    register={register}
                                    errors={errors}
                                    inputTag={"input"}
                                    inputType={"text"}
                                    defaultValue={customer?.shipping.address_1}
                                    setValue={setValue} />
                                <CustomInput
                                    fieldName="Building number"
                                    name='address2Shipping'
                                    register={register}
                                    errors={errors}
                                    inputTag={"input"}
                                    inputType={"number"}
                                    defaultValue={customer?.shipping.address_2}
                                    setValue={setValue} />
                                <CustomInput
                                    fieldName="№ apartment/office"
                                    name='apartmentNumberShipping'
                                    register={register}
                                    errors={errors}
                                    inputTag={"input"}
                                    inputType={"number"}
                                /* defaultValue={'not exist in data'}
                                setValue={setValue} */
                                />
                                <CustomInput
                                    fieldName="Kod pocztowy"
                                    name='postCodeShipping'
                                    register={register}
                                    errors={errors}
                                    inputTag={"input"}
                                    inputType={"number"}
                                    defaultValue={customer?.shipping.postcode}
                                    setValue={setValue} />
                            </FormWrapper>
                        }        </>}
            </InfoCard>

            <CustomInput
                fieldName="I agree to receiving information regarding news and changes to the stores offer"
                name='terms'
                register={register}
                errors={errors}
                inputTag={"input"}
                inputType={"checkbox"} />
            <FormWrapperBottom>
                <button type="submit" disabled={isSubmitting || !hasChanges}>{isSubmitting ? 'Saving...' : 'Save changes'}</button>
                {error && <CustomError dangerouslySetInnerHTML={{ __html: isAuthErrorResponseType(error) }}></CustomError>}
            </FormWrapperBottom>

        </CustomForm>
    );
}
