import { RegistrationFormSchema } from "@/types/layouts/forms/registrationForm";
import { FC, forwardRef, useCallback, useImperativeHandle, useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { WooCustomerReqType } from "@/types/services";
import { CustomInput } from "../CustomInput";
import { CustomForm, FormWrapper } from "./styles";
// import { PhoneInput } from "react-international-phone";
import 'react-international-phone/style.css';
import { PhoneInput } from "react-international-phone";
import Image from "next/image";

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
    const [phone, setPhone] = useState('');

    useImperativeHandle(ref, () => ({
        submit: () => handleSubmit(onSubmit)(),
    }));

    useImperativeHandle(ref, () => ({ submit: () => handleSubmit(onSubmit)() }));

    const formSchema = useMemo(() => RegistrationFormSchema(isLoggedIn, isCheckout, isShipping),
        [isLoggedIn, isCheckout, isShipping]);
    // const formSchema = RegistrationFormSchema(isLoggedIn, isCheckout, isShipping);
    type RegistrationFormType = z.infer<typeof formSchema>;

    const { register, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful }, setValue, reset } = useForm<RegistrationFormType>({
        resolver: zodResolver(formSchema)
    });

    const onSubmit = (data) =>
    {
        console.log(data);
    };

    return (
        <CustomForm onSubmit={handleSubmit(onSubmit)}>
            <FormWrapper>
                <CustomInput
                    fieldName="Imię"
                    name='name'
                    register={register}
                    errors={errors}
                    setValue={setValue}
                // initialValue={userFields ? userFields.first_name : null}
                />
                <CustomInput
                    fieldName="Nazwisko"
                    name='lastName'
                    register={register}
                    errors={errors}
                    setValue={setValue}
                />
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
                    name='address'
                    register={register}
                    errors={errors}
                    setValue={setValue}
                // initialValue={userFields ? userFields.billing.address_1 : null}
                />
                <CustomInput
                    fieldName="buildingNumber"
                    name='buildingNumber'
                    register={register}
                    errors={errors}
                    isNumeric={true}
                    setValue={setValue}
                // initialValue={userFields ? userFields.billing.postcode : null}
                />
                <CustomInput
                    fieldName="officeNumber"
                    name='officeNumber'
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
            </FormWrapper>
            <button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Submit'}</button>
        </CustomForm>
    );
});