import { FC, useEffect, useMemo, useState } from "react";
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
import { StyledButton } from "@/styles/components";
import theme from "@/styles/theme";
import { validateWooCustomer } from "@/utils/zodValidators/validateWooCustomer";
import { useCookies } from 'react-cookie';
import { useGetTokenMutation } from "@/store/rtk-queries/wpApi";
import { decodeJwt } from 'jose';

/**
 * @todo
 * Add cookie with right date
 * Check if the cookie is redirect page
 * Phone input validation
 * Other styles
 */

interface RegistrationFormProps
{
    isCheckout?: boolean;
    // userFields?: userFieldsType | null,
    // lineItems?: CartItem[] | [],
    // shippingLines?: ShippingLine[]
}

const isCheckout = false;
const isShipping = false;

// useImperativeHandle(ref, () => ({ submit: () => handleSubmit(onSubmit)() }));
export const RegistrationForm: FC = () =>
{
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [customError, setCustomError] = useState<string>('');
    const [cookies, setCookie, removeCookie] = useCookies(['authToken']);

    useEffect(() =>
    {
        if (isLoggedIn) router.push('/account');
    }, [router, isLoggedIn]);

    const formSchema = useMemo(() => RegistrationFormSchema(isLoggedIn, isCheckout, isShipping),
        [isLoggedIn, isCheckout, isShipping]);
    type RegistrationFormType = z.infer<typeof formSchema>;

    const { register, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful }, setValue, reset } = useForm<RegistrationFormType>({
        resolver: zodResolver(formSchema)
    });

    const [registerCustomerMutation, { error }] = useRegisterCustomerMutation();
    const [fetchToken, { error: tokenError }] = useGetTokenMutation();

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
            if (!resp.data) throw new Error('Invalid customer response');

            /** Check type of the response */
            const isResponseValid = await validateWooCustomer(resp.data);
            if (!isResponseValid) throw new Error('Invalid customer response');

            /** Fetching customer token */
            const tokenResp = await fetchToken({
                password: formData.password || "",
                username: formData.email
            });

            /** Validate customer token */
            if (!tokenResp.data) throw new Error('Invalid customer response');
            const authToken = tokenResp.data.token;

            /** Decoded customer token */
            const decodedToken = decodeJwt(tokenResp.data.token);
            if (!decodedToken.exp) throw new Error('Error while decoding jwt token');

            /**Set authToken cookie*/
            const expiresDate = new Date(decodedToken.exp * 1000);
            console.log(expiresDate);

            setCookie('authToken', authToken,
                {
                    expires: expiresDate,
                    // httpOnly: true,
                    // secure: true,
                    // sameSite: 'strict',
                    path: '/'
                });
        } catch (err)
        {
            setCustomError('Oops! Something went wrong with the server. Please try again or contact support.');
        }
        // finally
        // {
        //     reset();
        // }
    }

    return (
        <CustomForm onSubmit={handleSubmit(onSubmit)}>
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
                {!isLoggedIn && <CustomFormInput
                    fieldName="Hasło"
                    name='password'
                    register={register}
                    errors={errors}
                    inputTag={"input"}
                    inputType={"password"} />}
                {!isLoggedIn && <CustomFormInput
                    fieldName="Powtórz hasło"
                    name='confirmPassword'
                    register={register}
                    errors={errors}
                    inputTag={"input"}
                    inputType={"password"} />}
                <CustomFormInput
                    fieldName="Wyrażam zgodę na przetwarzanie danych osobowych."
                    name='terms'
                    register={register}
                    errors={errors}
                    inputTag={"input"}
                    inputType={"checkbox"} />
            </FormWrapper>
            <FormWrapperBottom>
                <StyledButton
                    backgroundColor={theme.background.hover}
                    color={theme.colors.white}
                    type="submit"
                    disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Submit'}
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