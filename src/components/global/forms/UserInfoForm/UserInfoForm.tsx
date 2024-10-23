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

    // auth route
  /*   const router = useRouter();
    useEffect(() =>
        {
            if (isLoggedIn) router.push('/account');
        }, [router, isLoggedIn]); */

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [isUpdate, setIsUpdate] = useState<boolean>(true);
    const [hasChanges, setHasChanges] = useState<boolean>(false);

    // hard fetch user
    // todo write some fetch with authorized user data
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
            resolver: zodResolver(formSchema)
        });

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
                        setValue={setValue}/>
                    <CustomInput
                        fieldName="phone number"
                        name='phoneNumber'
                        register={register}
                        errors={errors}
                        inputTag={"input"}
                        inputType={"tel"} 
                        defaultValue={customer?.billing.phone}
                        setValue={setValue}/>
                    <CustomInput
                        fieldName="Kraj / region"
                        name='country'
                        register={register}
                        errors={errors}
                        inputTag={"input"}
                        inputType={"text"} 
                        defaultValue={customer?.billing.country}
                        setValue={setValue}/>
                    <CustomInput
                        fieldName="Miasto"
                        name='city'
                        register={register}
                        errors={errors}
                        inputTag={"input"}
                        inputType={"text"} 
                        defaultValue={customer?.billing.city}
                        setValue={setValue}/>
                    <CustomInput
                        fieldName="Ulica"
                        name='address1'
                        register={register}
                        errors={errors}
                        inputTag={"input"}
                        inputType={"text"} 
                        defaultValue={customer?.billing.address_1}
                        setValue={setValue}/>
                    <CustomInput
                        fieldName="Building number"
                        name='address2'
                        register={register}
                        errors={errors}
                        inputTag={"input"}
                        inputType={"number"} 
                        defaultValue={customer?.billing.address_2}
                        setValue={setValue}/>
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
                        setValue={setValue}/>
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
