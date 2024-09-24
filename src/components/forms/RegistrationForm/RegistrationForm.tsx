import { RegistrationFormSchema } from "@/types/layouts/forms/registrationForm";
import { FC, forwardRef, useCallback, useImperativeHandle } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { WooCustomerReqType } from "@/types/services";
import { CustomInput } from "../CustomInput";
import { CustomForm, FormWrapper } from "./styles";

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

// To do: userFields, lineItems, shippingLines

export const RegistrationForm = forwardRef((props, ref) =>
{
    useImperativeHandle(ref, () => ({
        submit: () => handleSubmit(onSubmit)(),
    }));

    useImperativeHandle(ref, () => ({ submit: () => handleSubmit(onSubmit)() }));

    const formSchema = RegistrationFormSchema(false, false, false);
    type RegistrationFormType = z.infer<typeof formSchema>;

    const { register,
        handleSubmit,
        formState: { errors, isSubmitting, isSubmitSuccessful },
        setValue, reset } = useForm<RegistrationFormType>({
            resolver: zodResolver(formSchema)
        });

    const onSubmit = (data) =>
    {
        console.log(data);
    };

    return (
        <CustomForm>
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
            </FormWrapper>
        </CustomForm>
    );
});