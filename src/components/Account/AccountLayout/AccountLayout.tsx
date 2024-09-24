import Head from "next/head";
import React, { ReactNode } from "react";
import accountLinks from "./accountLinks";
import { useTranslations } from "next-intl";
import { AccountContainer, AccountContent } from "./styles";
import SideListTest from "@/components/Layouts/SideListTest";
import { Title } from "@/styles/components";

export default function AccountLayout({
    title,
    children
}: {
    title: string,
    children: ReactNode
}) {
    const t = useTranslations("MyAccount");

    const translatedAccountLinks = accountLinks.map(({ name, ...props }) => ({
        name: t(name),
        ...props
    }))

    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>

            <AccountContainer>
                <SideListTest links={translatedAccountLinks} />
                <AccountContent>
                    <Title as={"h1"} textAlign="center" uppercase fontSize={24}>{title}</Title>
                    {children}
                </AccountContent>
            </AccountContainer>
        </>
    );
}