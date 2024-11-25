import { FC, forwardRef, useCallback, useImperativeHandle, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { WooCustomerReqType } from "@/types/services";
import { PhoneInput } from "react-international-phone";
import 'react-international-phone/style.css';
import { RegistrationFormSchema } from "@/types/pages/account/RegistrationForm/registrationForm";
import { CustomFormInput } from "@/components/global/forms/CustomFormInput";
import { CustomForm, FormWrapper } from "@/components/global/forms/RegistrationForm/styles";

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
                <CustomFormInput
                    fieldName="Imię"
                    name='name'
                    register={register}
                    errors={errors}
                    setValue={setValue} inputTag={"input"} inputType={"number"}
                />

                <CustomFormInput
                    fieldName="Nazwisko"
                    name='lastName'
                    register={register}
                    errors={errors}
                    setValue={setValue} inputTag={"input"} inputType={"number"} />
                <CustomFormInput
                    fieldName="Adres e-mail"
                    name='email'
                    register={register}
                    errors={errors}
                    setValue={setValue} inputTag={"input"} inputType={"number"}
                />
                {!isLoggedIn && <CustomFormInput
                    fieldName="Hasło"
                    name='password'
                    register={register}
                    errors={errors} inputTag={"input"} inputType={"password"}
                />}
                {!isLoggedIn && <CustomFormInput
                    fieldName="Powtórz hasło"
                    name='confirmPassword'
                    register={register}
                    errors={errors} inputTag={"input"} inputType={"password"}
                />}
                <CustomFormInput
                    fieldName="Numer telefonu"
                    name='phoneNumber'
                    register={register}
                    errors={errors}
                    setValue={setValue} inputTag={"input"} inputType={"number"}                // initialValue={userFields ? userFields.billing.phone : null}
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