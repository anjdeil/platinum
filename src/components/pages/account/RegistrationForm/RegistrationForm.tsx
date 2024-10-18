import { RegistrationFormSchema } from "@/types/pages/account/registrationForm/registrationForm";
import { FC, forwardRef, useCallback, useImperativeHandle, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { WooCustomerReqType } from "@/types/services";
import { CustomForm, FormWrapper } from "./styles";
import { PhoneInput } from "react-international-phone";
import 'react-international-phone/style.css';
import { CustomInput } from "../../../global/forms/CustomInput";

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

// To do: userFields, lineItems, shippingLines
export const RegistrationForm = forwardRef((props, ref) =>
{
    const [phone, setPhone] = useState('');

    useImperativeHandle(ref, () => ({
        submit: () => handleSubmit(onSubmit)(),
    }));

    useImperativeHandle(ref, () => ({ submit: () => handleSubmit(onSubmit)() }));

    const formSchema = RegistrationFormSchema(isLoggedIn, false, false);
    type RegistrationFormType = z.infer<typeof formSchema>;

    const { register, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful }, setValue, reset } = useForm<RegistrationFormType>({
        resolver: zodResolver(formSchema)
    });

    const onSubmit = (data: RegistrationFormType) =>
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
                    fieldName="Numer telefonu"
                    name='phoneNumber'
                    register={register}
                    errors={errors}
                    isNumeric={true}
                    setValue={setValue}
                // initialValue={userFields ? userFields.billing.phone : null}
                />
                <PhoneInput
                    defaultCountry="ua"
                    value={phone}
                    onChange={(phone) => setPhone(phone)}
                />
            </FormWrapper>
            <button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Submit'}</button>
        </CustomForm>
    );
});