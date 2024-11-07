import { RegistrationForm } from "@/components/global/forms/RegistrationForm";
import { Container } from "@/styles/components";
import Head from "next/head";

export default function Registration()
{
    return (
        <>
            <Head>
                <title>My account registration</title>
            </Head>
            <Container>
                <RegistrationForm />
            </Container>
        </>
    )
}