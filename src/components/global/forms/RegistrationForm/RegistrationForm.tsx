import { FC, useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import 'react-international-phone/style.css';
import { useRegisterCustomerMutation } from "@/store/rtk-queries/wooCustomApi";
import { useRouter } from "next/router";
import { RegistrationFormSchema } from "@/types/components/global/forms/registrationForm";
import { CustomForm, FormWrapper, FormWrapperBottom } from "./styles";
import { isAuthErrorResponseType } from "@/utils/isAuthErrorResponseType";
import { CustomFormInput } from "../CustomFormInput";
import { CustomError, CustomSuccess } from "../CustomFormInput/styles";
import { StyledButton, Title } from "@/styles/components";
import theme from "@/styles/theme";
import { validateWooCustomer } from "@/utils/zodValidators/validateWooCustomer";
import { useCheckTokenMutation, useGetTokenMutation } from "@/store/rtk-queries/wpApi";
import { CustomFormCheckbox } from "../CustomFormCheckbox";

/**
 * @todo
 * Check cookie in getServerSideProps
 * Redirect after successful validation during reg
 * Other styles
 */

export const RegistrationForm: FC = () =>
{
    const router = useRouter();
    const [customError, setCustomError] = useState<string>('');

    /** Form settings */
    const formSchema = useMemo(() => RegistrationFormSchema(false), []);
    type RegistrationFormType = z.infer<typeof formSchema>;
    const { register, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful }, setValue, reset } = useForm<RegistrationFormType>({
        resolver: zodResolver(formSchema)
    });

    /** API */
    const [registerCustomerMutation, { error }] = useRegisterCustomerMutation();
    const [fetchToken] = useGetTokenMutation();
    const [checkToken] = useCheckTokenMutation();

    async function onSubmit(formData: RegistrationFormType)
    {
        setCustomError('');
        const reqBody = {
            email: formData.email,
            first_name: formData.name,
            last_name: formData.lastName,
            password: formData.password,
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
                phone: formData.phoneNumber
            }
        }

        try
        {
            /** Register a new customer */
            const resp = await registerCustomerMutation(reqBody);
            if (!resp.data) throw new Error('Invalid customer response.');

            /** Validate type of the response */
            const isResponseValid = await validateWooCustomer(resp.data);
            if (!isResponseValid) throw new Error('Customer response data validation failed.');

            /** Fetching auth token */
            const tokenResp = await fetchToken({
                password: formData.password || "",
                username: formData.email
            });
            if (!tokenResp.data) throw new Error('Auth token getting failed.');

            /** Validate auth token */
            const isTokenValid = await checkToken({});
            if (!isTokenValid) throw new Error('Auth token validation failed.');
            router.push('/my-account');

        } catch (err)
        {
            setCustomError('Oops! Something went wrong with the server. Please try again or contact support.');
        }
        finally
        {
            reset();
        }
    }

    return (
        <CustomForm onSubmit={handleSubmit(onSubmit)}>
            <Title
                as={"h2"}
                uppercase={true}
                marginBottom={'24px'}
            >
                Register
            </Title>
            <FormWrapper>
                <CustomFormInput
                    fieldName="Imię"
                    name='name'
                    register={register}
                    errors={errors}
                    inputTag={"input"}
                    inputType={"text"} />
                <CustomFormInput
                    fieldName="Nazwisko"
                    name='lastName'
                    register={register}
                    errors={errors}
                    inputTag={"input"}
                    inputType={"text"} />
                <CustomFormInput
                    fieldName="Adres e-mail"
                    name='email'
                    register={register}
                    errors={errors}
                    inputTag={"input"}
                    inputType={"text"} />
                <CustomFormInput
                    fieldName="phone number"
                    name='phoneNumber'
                    register={register}
                    errors={errors}
                    setValue={setValue}
                    inputTag={"input"}
                    inputType={"phone"}
                />
                <CustomFormInput
                    fieldName="Kraj / region"
                    name='country'
                    register={register}
                    errors={errors}
                    inputTag={"input"}
                    inputType={"text"} />
                <CustomFormInput
                    fieldName="Miasto"
                    name='city'
                    register={register}
                    errors={errors}
                    inputTag={"input"}
                    inputType={"text"} />
                <CustomFormInput
                    fieldName="Ulica"
                    name='address1'
                    register={register}
                    errors={errors}
                    inputTag={"input"}
                    inputType={"text"} />
                <CustomFormInput
                    fieldName="Building number"
                    name='address2'
                    register={register}
                    errors={errors}
                    inputTag={"input"}
                    inputType={"number"} />
                <CustomFormInput
                    fieldName="№ apartment/office"
                    name='apartmentNumber'
                    register={register}
                    errors={errors}
                    inputTag={"input"}
                    inputType={"number"} />
                <CustomFormInput
                    fieldName="Kod pocztowy"
                    name='postCode'
                    register={register}
                    errors={errors}
                    inputTag={"input"}
                    inputType={"text"} />
                <CustomFormInput
                    fieldName="Hasło"
                    name='password'
                    register={register}
                    errors={errors}
                    inputTag={"input"}
                    inputType={"password"} />
                <CustomFormInput
                    fieldName="Powtórz hasło"
                    name='confirmPassword'
                    register={register}
                    errors={errors}
                    inputTag={"input"}
                    inputType={"password"} />
                {/* <CustomFormInput
                    fieldName="Wyrażam zgodę na przetwarzanie danych osobowych."
                    name='terms'
                    register={register}
                    errors={errors}
                    inputTag={"input"}
                    inputType={"checkbox"} /> */}
            </FormWrapper>
            <CustomFormCheckbox
                name={"terms"}
                register={register}
                errors={errors}
                label={"Wyrażam zgodę na przetwarzanie danych osobowych."}
            />
            <FormWrapperBottom>
                <StyledButton
                    backgroundColor={theme.background.hover}
                    color={theme.colors.white}
                    type="submit"
                    disabled={isSubmitting}>
                    Register
                </StyledButton>
                {(error && customError) &&
                    <CustomError
                        dangerouslySetInnerHTML={{ __html: isAuthErrorResponseType(error || customError) }}>
                    </CustomError>}
                {(isSubmitSuccessful && !error && customError) &&
                    <CustomSuccess>
                        Your account has been created successfully!
                    </CustomSuccess>}
            </FormWrapperBottom>
        </CustomForm>
    );

}