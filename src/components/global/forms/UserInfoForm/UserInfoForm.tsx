import { FC, useEffect, useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import 'react-international-phone/style.css';
import { InfoCard, OptionButton, OptionButtonsContainer, ProofSelect } from "./styles";
import { CustomForm, FormWrapper, FormWrapperBottom } from "@/styles/components";
import { isAuthErrorResponseType } from "@/utils/isAuthErrorResponseType";
import { UserInfoFormSchema } from "@/types/components/global/forms/userInfoForm";
import { Title } from "@/styles/components";
import { useFetchCustomerQuery, useUpdateCustomerMutation } from "@/store/rtk-queries/wooCustomApi";
import { CircularProgress } from "@mui/material";
import CustomSelect from "../../selects/CustomSelect/CustomSelect";
import { CustomFormInput } from "../CustomFormInput";
import { CustomError } from "../CustomFormInput/styles";

const isUpdate = true;
const isCheckout = false;

export const UserInfoForm: FC = () => {

    // auth route
    /*   const router = useRouter();
    useEffect(() =>
        {
            if (isLoggedIn) router.push('/account');
        }, [router, isLoggedIn]); */

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [isShipping, setIsShipping] = useState<boolean>(true);
    const [hasChanges, setHasChanges] = useState<boolean>(false);

    // hard fetch user
    const { data: customer, error: customerError, isLoading: isCustomerLoading } = useFetchCustomerQuery({ customerId: '14408' });

    const [UpdateCustomerMutation,
        { data, error, isLoading }] = useUpdateCustomerMutation();

    const formSchema = useMemo(() => UserInfoFormSchema(isLoggedIn, isUpdate, isCheckout, isShipping),
        [isLoggedIn, isUpdate, isCheckout, isShipping]);
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


    useEffect(() => {
        const subscription = watch((value, { name, type }) => {
            if (type === 'change') {
                setHasChanges(true);
                console.log('hasChanges:', hasChanges);
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
            proofOfPurchase: formData.proofOfPurchase, //in process
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
            },
            shipping: {
                first_name: formData.name,
                last_name: formData.lastName,
                phone: formData.phoneNumber,
                address_1: isShipping && formData.address1Shipping || formData.address1,
                address_2: isShipping && formData.address2Shipping || formData.address2,
                city: isShipping && formData.cityShipping || formData.city,
                postcode: isShipping && formData.postCodeShipping || formData.postCode,
                country: isShipping && formData.countryShipping || formData.country,
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


    const proofOfPurchaseValue = watch("proofOfPurchase");

    //mocks data
    const proofOfPurchaseOptions = [
        { code: "Receipt", symbol: "Receipt" },
        { code: "VAT Invoice", symbol: "VAT Invoice" },
        { code: "Bank transfer receipt", symbol: "Bank transfer receipt" },
    ];


    return (
        <CustomForm onSubmit={handleSubmit(onSubmit)} maxWidth='660px'>
            <InfoCard>
                <Title as="h2" fontWeight={600} fontSize="24px" uppercase={true} marginBottom='16px'>
                    User information
                </Title>
                {isCustomerLoading && !customer ?
                    <CircularProgress /> :
                    <>
                        <FormWrapper>
                            <CustomFormInput
                                fieldName="Imię"
                                name='name'
                                inputTag={"input"}
                                inputType={"text"}
                                register={register}
                                errors={errors}
                                defaultValue={customer?.first_name || ""}
                                setValue={setValue}
                            />
                            <CustomFormInput
                                fieldName="Nazwisko"
                                name='lastName'
                                register={register}
                                errors={errors}
                                inputTag={"input"}
                                inputType={"text"}
                                defaultValue={customer?.last_name || ""}
                                setValue={setValue} />
                            <CustomFormInput
                                fieldName="Adres e-mail"
                                name='email'
                                register={register}
                                errors={errors}
                                inputTag={"input"}
                                inputType={"text"}
                                defaultValue={customer?.email || ""}
                                setValue={setValue} />
                            <CustomFormInput
                                fieldName="phone number"
                                name='phoneNumber'
                                register={register}
                                errors={errors}
                                inputTag={"input"}
                                inputType={"phone"}
                                defaultValue={customer?.billing.phone || ""}
                                setValue={setValue} />
                            <CustomFormInput
                                fieldName="Kraj / region"
                                name='country'
                                register={register}
                                errors={errors}
                                inputTag={"input"}
                                inputType={"text"}
                                defaultValue={customer?.billing.country || ""}
                                setValue={setValue} />
                            <CustomFormInput
                                fieldName="Miasto"
                                name='city'
                                register={register}
                                errors={errors}
                                inputTag={"input"}
                                inputType={"text"}
                                defaultValue={customer?.billing.city || ""}
                                setValue={setValue} />
                            <CustomFormInput
                                fieldName="Ulica"
                                name='address1'
                                register={register}
                                errors={errors}
                                inputTag={"input"}
                                inputType={"text"}
                                defaultValue={customer?.billing.address_1 || ""}
                                setValue={setValue} />
                            <CustomFormInput
                                fieldName="Building number"
                                name='address2'
                                register={register}
                                errors={errors}
                                inputTag={"input"}
                                inputType={"number"}
                                defaultValue={customer?.billing.address_2 || ""}
                                setValue={setValue} />
                            <CustomFormInput
                                fieldName="№ apartment/office"
                                name='apartmentNumber'
                                register={register}
                                errors={errors}
                                inputTag={"input"}
                                inputType={"number"}
                            /* defaultValue={'not exist in data'}
                            setValue={setValue} */
                            />
                            <CustomFormInput
                                fieldName="Kod pocztowy"
                                name='postCode'
                                register={register}
                                errors={errors}
                                inputTag={"input"}
                                inputType={"number"}
                                defaultValue={customer?.billing.postcode || ""}
                                setValue={setValue} />
                        </FormWrapper>
                        <ProofSelect>
                            <CustomSelect
                                label="Proof of purchase"
                                name="proofOfPurchase"
                                setValue={setValue}
                                register={register}
                                errors={errors}
                                options={proofOfPurchaseOptions}
                                width="100%"
                                defaultValue={proofOfPurchaseOptions[0].symbol || ""}
                                borderRadius="8px"
                                background='#F2F8FE'
                                padding="12px"
                                mobFontSize="14px"
                                mobPadding="12px"
                                tabletPadding="12px"
                                allignItem="flex-start"
                                paddingOptions="4px"
                            />
                        </ProofSelect>
                        <OptionButtonsContainer>
                            {proofOfPurchaseOptions.slice(0, 2).map((option) => (
                                <OptionButton
                                    key={option.code}
                                    type="button"
                                    onClick={() => {
                                        setValue("proofOfPurchase", option.code);
                                    }}
                                    isSelected={option.code === proofOfPurchaseValue}
                                >
                                    {option.symbol}
                                </OptionButton>
                            ))}
                        </OptionButtonsContainer>

                    </>
                }
            </InfoCard>
            <InfoCard>
                <Title as="h2" fontWeight={600} fontSize="24px" uppercase={true} marginBottom='16px'>
                    Shipping information
                </Title>
                <CustomFormInput
                    fieldName="The same address as on customer information"
                    name='IsShipping'
                    onChange={(e) => setIsShipping(!e.target.checked)}
                    register={register}
                    errors={errors}
                    inputTag={"input"}
                    inputType={"checkbox"} />
                {isCustomerLoading && !customer ?
                    <CircularProgress /> :
                    <>
                        {isShipping &&
                            <>
                                <FormWrapper>
                                    <CustomFormInput
                                        fieldName="Kraj / region"
                                        name='countryShipping'
                                        register={register}
                                        errors={errors}
                                        inputTag={"input"}
                                        inputType={"text"}
                                        defaultValue={customer?.shipping.country || ""}
                                        setValue={setValue} />
                                    <CustomFormInput
                                        fieldName="Miasto"
                                        name='cityShipping'
                                        register={register}
                                        errors={errors}
                                        inputTag={"input"}
                                        inputType={"text"}
                                        defaultValue={customer?.shipping.city || ""}
                                        setValue={setValue} />
                                    <CustomFormInput
                                        fieldName="Ulica"
                                        name='address1Shipping'
                                        register={register}
                                        errors={errors}
                                        inputTag={"input"}
                                        inputType={"text"}
                                        defaultValue={customer?.shipping.address_1 || ""}
                                        setValue={setValue} />
                                    <CustomFormInput
                                        fieldName="Building number"
                                        name='address2Shipping'
                                        register={register}
                                        errors={errors}
                                        inputTag={"input"}
                                        inputType={"number"}
                                        defaultValue={customer?.shipping.address_2 || ""}
                                        setValue={setValue} />
                                    <CustomFormInput
                                        fieldName="№ apartment/office"
                                        name='apartmentNumberShipping'
                                        register={register}
                                        errors={errors}
                                        inputTag={"input"}
                                        inputType={"number"}

                                    />
                                    <CustomFormInput
                                        fieldName="Kod pocztowy"
                                        name='postCodeShipping'
                                        register={register}
                                        errors={errors}
                                        inputTag={"input"}
                                        inputType={"number"}
                                        defaultValue={customer?.shipping.postcode || ""}
                                        setValue={setValue} />
                                </FormWrapper>

                            </>
                        }</>}
            </InfoCard>

            <CustomFormInput
                fieldName="I agree to receiving information regarding news and changes to the stores offer"
                name='terms'
                register={register}
                errors={errors}
                inputTag={"input"}
                inputType={"checkbox"} />
            <FormWrapperBottom>
                <button type="submit" disabled={isSubmitting || !hasChanges}>{isSubmitting ? 'Saving...' : 'Save changes'}</button>
                {error && <CustomError dangerouslySetInnerHTML={{ __html: isAuthErrorResponseType(error) }}></CustomError>}
            </FormWrapperBottom>

        </CustomForm>
    );
}
