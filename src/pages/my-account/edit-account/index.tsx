import { RegistrationForm } from "@/components/global/forms/RegistrationForm";
import { Container, Title } from "@/styles/components";
import Head from "next/head";
import { GetServerSidePropsContext } from "next";
import wpRestApi from "@/services/wpRestApi";
import { FormContainer } from "@/components/pages/account/styles";

export default function UserInfo()
{
    return (
        <>
            <Head>
                <title>User information</title>
            </Head>
            <Container>
                <FormContainer>
                    <RegistrationForm />
                </FormContainer>
            </Container>
        </>
    )
}

export const getServerSideProps = async (context: GetServerSidePropsContext) =>
{
    const cookies = context.req.cookies;
    if (!cookies?.authToken) return { props: {} };

    try
    {
        const response = await wpRestApi.post('jwt-auth/v1/token/validate', {}, false, `Bearer ${cookies.authToken}`);
        if (!response.data)
        {
            return {
                redirect: {
                    destination: '/my-account/login',
                    permanent: false,
                }
            };
        }

        return { props: {} };

    } catch (err)
    {
        console.error(err);
        return { props: {} };
    }
};