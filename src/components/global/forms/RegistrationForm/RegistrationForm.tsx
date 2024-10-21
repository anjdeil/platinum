import { FC, forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import 'react-international-phone/style.css';
import { useRegisterCustomerMutation } from "@/store/rtk-queries/wooCustomApi";
import { CustomInput } from "../CustomInput/CustomInput";
import { useRouter } from "next/router";
import { RegistrationFormSchema } from "@/types/components/global/forms/registrationForm";
import { CustomForm, FormWrapper, FormWrapperBottom } from "./styles";
import { isAuthErrorResponseType } from "@/utils/isAuthErrorResponseType";
import { CustomError } from "../CustomInput/styles";

interface RegistrationFormProps
{
    isCheckout?: boolean;
    // userFields?: userFieldsType | null,
    // lineItems?: CartItem[] | [],
    // shippingLines?: ShippingLine[]
}

interface FormHandle
{
    submit: () => void;
}

const isCheckout = false;
const isShipping = false;

/**
 * 
 * @todo
 * userFields, lineItems, shippingLines;
 * forwardRef((props, ref);
 * // useImperativeHandle(ref, () => ({
    //     submit: () => handleSubmit(onSubmit)(),
    // }));
    // useImperativeHandle(ref, () => ({ submit: () => handleSubmit(onSubmit)() }));
 */
export const RegistrationForm: FC = () =>
{
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    useEffect(() =>
    {
        if (isLoggedIn) router.push('/account');
    }, [router, isLoggedIn]);

    const formSchema = useMemo(() => RegistrationFormSchema(isLoggedIn, isCheckout, isShipping),
        [isLoggedIn, isCheckout, isShipping]);
    type RegistrationFormType = z.infer<typeof formSchema>;

    const [registerCustomerMutation, { data, error, isLoading }] = useRegisterCustomerMutation();

    const { register, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful }, setValue, reset } = useForm<RegistrationFormType>({
        resolver: zodResolver(formSchema)
    });

    async function onSubmit(formData: RegistrationFormType)
    {
        const data = {
            email: formData.email,
            first_name: formData.name,
            last_name: formData.lastName,
            role: 'customer',
            username: formData.email,
            billing: {
                first_name: formData.name,
                last_name: formData.lastName,
                // apartmentNumber
                address_1: formData.address1,
                address_2: formData.address2,
                city: formData.city,
                postcode: formData.postCode,
                country: formData.country,
                email: formData.email,
                phone: '+48 888 888 888',
            }
        }

        try
        {
            const response = await registerCustomerMutation(data);
            if (response)
                console.log(response);
        } catch (error)
        {
            console.error(error);
        }

    }

    return (
        <CustomForm onSubmit={handleSubmit(onSubmit)}>
            <FormWrapper>
                <CustomInput
                    fieldName="Imię"
                    name='name'
                    register={register}
                    errors={errors}
                    // setValue={setValue}
                    inputTag={"input"}
                    inputType={"text"} />
                <CustomInput
                    fieldName="Nazwisko"
                    name='lastName'
                    register={register}
                    errors={errors}
                    // setValue={setValue}
                    inputTag={"input"}
                    inputType={"text"} />
                <CustomInput
                    fieldName="Adres e-mail"
                    name='email'
                    register={register}
                    errors={errors}
                    // setValue={setValue}
                    inputTag={"input"}
                    inputType={"text"} />
                {/* <CustomInput
                    fieldName="phone number"
                    name='phoneNumber'
                    register={register}
                    errors={errors}
                    setValue={setValue}
                // isPhone={true}
                /> */}
                <CustomInput
                    fieldName="Kraj / region"
                    name='country'
                    register={register}
                    errors={errors}
                    // setValue={setValue}
                    inputTag={"input"}
                    inputType={"text"} />
                <CustomInput
                    fieldName="Miasto"
                    name='city'
                    register={register}
                    errors={errors}
                    // setValue={setValue}
                    inputTag={"input"}
                    inputType={"text"} />
                <CustomInput
                    fieldName="Ulica"
                    name='address1'
                    register={register}
                    errors={errors}
                    // setValue={setValue}
                    inputTag={"input"}
                    inputType={"text"} />
                <CustomInput
                    fieldName="Building number"
                    name='address2'
                    register={register}
                    errors={errors}
                    // setValue={setValue}
                    inputTag={"input"}
                    inputType={"number"} />
                <CustomInput
                    fieldName="№ apartment/office"
                    name='apartmentNumber'
                    register={register}
                    errors={errors}
                    // setValue={setValue}
                    inputTag={"input"}
                    inputType={"number"} />
                <CustomInput
                    fieldName="Kod pocztowy"
                    name='postCode'
                    register={register}
                    errors={errors}
                    // setValue={setValue}
                    inputTag={"input"}
                    inputType={"number"} />
                {!isLoggedIn && <CustomInput
                    fieldName="Hasło"
                    name='password'
                    register={register}
                    errors={errors}
                    // setValue={setValue}
                    inputTag={"input"}
                    inputType={"password"} />}
                {!isLoggedIn && <CustomInput
                    fieldName="Powtórz hasło"
                    name='confirmPassword'
                    register={register}
                    errors={errors}
                    // setValue={setValue}
                    inputTag={"input"}
                    inputType={"password"} />}
                <CustomInput
                    fieldName="Wyrażam zgodę na przetwarzanie danych osobowych."
                    name='terms'
                    register={register}
                    errors={errors}
                    // setValue={setValue}
                    inputTag={"input"}
                    inputType={"checkbox"} />
            </FormWrapper>
            <FormWrapperBottom>
                <button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Submit'}</button>
                {error && <CustomError dangerouslySetInnerHTML={{ __html: isAuthErrorResponseType(error) }}></CustomError>}
            </FormWrapperBottom>
        </CustomForm>
    );
}