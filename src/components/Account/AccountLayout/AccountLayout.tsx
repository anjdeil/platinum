import SideList from "@/components/Layouts/SideList/SideList";
import { AccountTitle } from "@/styles/components";
import { useTranslations } from "next-intl";
import Head from "next/head";
import { ReactNode } from "react";
import accountLinks from "./accountLinks";
import { AccountContainer, AccountContent, SideListContainer } from "./styles";

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

            <AccountTitle as={"h1"} textAlign="center" uppercase>{title}</AccountTitle>
            <AccountContainer>
                <SideListContainer>
                    <SideList
                        links={translatedAccountLinks}
                        borderRadius="10px"
                    />
                </SideListContainer>
                <AccountContent>
                    {children}
                </AccountContent>
            </AccountContainer>
        </>
    );
}