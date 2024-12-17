import { RegistrationForm } from "@/components/global/forms/RegistrationForm";
import { UserInfoForm } from "@/components/global/forms/UserInfoForm";
import { Container } from "@/styles/components";
import Head from "next/head";

export default function UserInformation()
{
    return (
        <>
            <Container>
                <UserInfoForm />
            </Container>
        </>
    )
}