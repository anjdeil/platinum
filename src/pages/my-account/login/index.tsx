import { LoginForm } from "@/components/global/forms/LoginForm";
import { Container } from "@/styles/components";
import Head from "next/head";

export default function Login()
{
    return (
        <>
            <Head>
                <title>LOGIN</title>
            </Head>
            <Container>
                <LoginForm />
            </Container>
        </>
    )
}