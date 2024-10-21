import { FC } from "react";
import { CustomForm, FormWrapper, FormWrapperBottom } from "../RegistrationForm/styles";
import { LoginFormSchema, LoginFormType } from "@/types/components/global/forms/LoginForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomInput } from "../CustomInput";
import { useGetTokenMutation } from "@/store/rtk-queries/wpApi";
import { isAuthErrorResponseType } from "@/utils/isAuthErrorResponseType";
import { CustomError } from "../CustomInput/styles";
import { PrimaryButton } from "../../buttons/PrimaryButton/PrimaryButton";

export const LoginForm: FC = () => {
    const [getToken, { data, isLoading, error }] = useGetTokenMutation({});

    const { register, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful }, setValue, reset } = useForm<LoginFormType>({
        resolver: zodResolver(LoginFormSchema)
    });

    async function onSubmit(formData: LoginFormType) {
        const data = {
            username: formData.username,
            password: formData.password,
        }

        try {
            const response = await getToken(data);
            if (response)
                console.log(response);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <CustomForm onSubmit={handleSubmit(onSubmit)}>
            <FormWrapper>
                <CustomInput
                    fieldName="Adres e-mail"
                    placeholder="E-mail"
                    name='username'
                    register={register}
                    errors={errors}
                    // setValue={setValue}
                    inputTag={"input"}
                    inputType={"text"} />
                <CustomInput
                    fieldName="Hasło"
                    placeholder="Hasło"
                    name='password'
                    register={register}
                    errors={errors}
                    // setValue={setValue}
                    inputTag={"input"}
                    inputType={"password"} />
            </FormWrapper>
            <FormWrapperBottom>
                <PrimaryButton
                    children={isSubmitting ? 'Submitting...' : 'Submit'}
                    buttonType="submit"
                    isDisabled={isSubmitting}
                />
                {error && <CustomError dangerouslySetInnerHTML={{ __html: isAuthErrorResponseType(error) }}></CustomError>}
            </FormWrapperBottom>
        </CustomForm>
    );
}