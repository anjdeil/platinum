import { RegistrationFormSchema } from "@/types/layouts/forms/registrationForm";
import { FC, forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { WooCustomerReqType } from "@/types/services";
import { CustomInput } from "../CustomInput";
import { CustomForm, FormWrapper, FormWrapperBottom } from "./styles";
import Image from "next/image";
import 'react-international-phone/style.css';
import { useRegisterCustomerMutation } from "@/store/rtk-queries/wooCustomApi";
import { CustomInput2 } from "../CustomInput/CustomInput2";

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

const isLoggedIn = false;
const isCheckout = false;
const isShipping = false;

// To do: userFields, lineItems, shippingLines
export const RegistrationForm = forwardRef((props, ref) =>
{
    useImperativeHandle(ref, () => ({
        submit: () => handleSubmit(onSubmit)(),
    }));
    useImperativeHandle(ref, () => ({ submit: () => handleSubmit(onSubmit)() }));

    /** Dynamic types */
    const formSchema = useMemo(() => RegistrationFormSchema(isLoggedIn, isCheckout, isShipping),
        [isLoggedIn, isCheckout, isShipping]);
    type RegistrationFormType = z.infer<typeof formSchema>;

    const [registerCustomerMutation, { data, isError, error, isLoading }] = useRegisterCustomerMutation();

    const { register, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful }, setValue, reset } = useForm<RegistrationFormType>({
        resolver: zodResolver(formSchema)
    });

    function onSubmit(data)
    {
        console.log('data', data);
        console.log('errors', errors);
    }

    return (
        <CustomForm onSubmit={handleSubmit(onSubmit)}>
            <FormWrapper>
                {/* <CustomInput
                    fieldName="Imię"
                    name='name'
                    register={register}
                    errors={errors}
                    setValue={setValue}
                // initialValue={userFields ? userFields.first_name : null}
                /> */}
                <CustomInput2
                    fieldName="Imię"
                    name='name'
                    register={register}
                    errors={errors}
                    // setValue={setValue}
                    inputTag={"input"}
                />
                {/* <CustomInput
                    fieldName="Nazwisko"
                    name='lastName'
                    register={register}
                    errors={errors}
                    setValue={setValue}
                /> */}
                <CustomInput2
                    fieldName="Nazwisko"
                    name='lastName'
                    register={register}
                    errors={errors}
                    // setValue={setValue}
                    inputTag={"input"}
                />
                {/* <input {...register("lastName")} placeholder="Nazwisko" /> */}
                {/* <input {...register("email")} placeholder="Nazwisko" /> */}
                <CustomInput
                    fieldName="Adres e-mail"
                    name='email'
                    register={register}
                    errors={errors}
                    setValue={setValue}
                // initialValue={userFields ? userFields.email : null}
                />
                <CustomInput
                    fieldName="phone number"
                    name='phoneNumber'
                    register={register}
                    errors={errors}
                    setValue={setValue}
                    isPhone={true}
                />
                <CustomInput
                    fieldName="Kraj / region"
                    name='country'
                    register={register}
                    errors={errors}
                    setValue={setValue}
                // initialValue={userFields ? userFields.billing.country : null}
                />
                <CustomInput
                    fieldName="Miasto"
                    name='city'
                    register={register}
                    errors={errors}
                    setValue={setValue}
                // initialValue={userFields ? userFields.billing.city : null}
                />
                <CustomInput
                    fieldName="Ulica"
                    name='address1'
                    register={register}
                    errors={errors}
                    setValue={setValue}
                // initialValue={userFields ? userFields.billing.address_1 : null}
                />
                <CustomInput
                    fieldName="Building number"
                    name='address2'
                    register={register}
                    errors={errors}
                    isNumeric={true}
                    setValue={setValue}
                // initialValue={userFields ? userFields.billing.postcode : null}
                />
                <CustomInput
                    fieldName="№ apartment/office"
                    name='apartmentNumber'
                    register={register}
                    errors={errors}
                    isNumeric={true}
                    setValue={setValue}
                // initialValue={userFields ? userFields.billing.postcode : null}
                />
                <CustomInput
                    fieldName="Kod pocztowy"
                    name='postCode'
                    register={register}
                    errors={errors}
                    isNumeric={true}
                    isPost={true}
                    setValue={setValue}
                // initialValue={userFields ? userFields.billing.postcode : null}
                />
                {!isLoggedIn && <CustomInput
                    fieldName="Hasło"
                    name='password'
                    register={register}
                    errors={errors}
                    isPassword={true}
                />}
                {!isLoggedIn && <CustomInput
                    fieldName="Powtórz hasło"
                    name='confirmPassword'
                    register={register}
                    errors={errors}
                    isPassword={true}
                />}
                <CustomInput
                    fieldName="Wyrażam zgodę na przetwarzanie danych osobowych."
                    name='terms'
                    register={register}
                    errors={errors}
                    isCheckbox={true}
                />
            </FormWrapper>
            <FormWrapperBottom>
                <button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Submit'}</button>
            </FormWrapperBottom>
        </CustomForm>
    );
});