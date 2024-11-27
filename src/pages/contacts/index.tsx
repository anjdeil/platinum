import React from "react";
import { Container, Title } from "@/styles/components";
import { useAppSelector } from "@/store";
import {
    ContactCard,
    ContactCardText,
    ContactLink,
    ContactsCards,
    ContactsPageWrapper,
    ContactsSocials,
} from "./style";
import PhoneIcon from "@/components/global/icons/contacts/PhoneIcon/PhoneIcon";
import MailIcon from "@/components/global/icons/contacts/MailIcon/MailIcon";
import AddressIcon from "@/components/global/icons/contacts/AddressIcon/AddressIcon";
import { Socials } from "@/components/menus/Socials";
import theme from "@/styles/theme";
import { useRouter } from "next/router";
import Breadcrumbs from "@/components/global/Breadcrumbs/Breadcrumbs";
import ContactsForm from "@/components/pages/contacts/ContactsForm/ContactsForm";
import { useTranslations } from "next-intl";
import { useResponsive } from "@/hooks/useResponsive";

const ContactsPage = () => {
    const t = useTranslations("Contacts");
    const { isTablet } = useResponsive()
    const themeOptions = useAppSelector((state) => state.themeOptions);
    const ContactItems = themeOptions.data.item.contacts;
    const router = useRouter();

    const currentPath = router.asPath;

    const pathParts = currentPath.split("/").filter((part) => part);

    const breadcrumbsLinks = pathParts.map((part, index) => {
        const url = `/${pathParts.slice(0, index + 1).join("/")}`;
        return { name: part.charAt(0).toUpperCase() + part.slice(1), url };
    });

    const breadcrumbsLinksMock = [
        { name: "Home Page", url: "/" },
        { name: "Contacts", url: "/contacts" },
    ];



    return (
        <Container>
            <ContactsPageWrapper>
                <div>
                    <Breadcrumbs links={breadcrumbsLinksMock} />
                    <Title as="h2" uppercase marginBottom="24px" marginTop="12px">
                        {t("contacts")}
                    </Title>
                    <ContactsCards>
                        <ContactCard>
                            <PhoneIcon />
                            <Title as="h2" uppercase marginBottom="24px" fontWeight={500}>
                                {t("telephone")}
                            </Title>
                            <ContactCardText>{ContactItems.phone}</ContactCardText>
                            <ContactLink href={`tel:${ContactItems.phone}`} passHref>
                                {t("call")}
                            </ContactLink>
                        </ContactCard>
                        <ContactCard>
                            <AddressIcon />
                            <Title as="h2" uppercase marginBottom="24px" fontWeight={500}>
                                {t("address")}
                            </Title>
                            <ContactCardText>
                                {ContactItems.address}
                                <div>
                                    {t("schedule")}
                                    : {ContactItems.schedule[0]?.from_time} -{" "}
                                    {ContactItems.schedule[0]?.to_time} <br />
                                    {ContactItems.schedule[1]?.not_working
                                        ? t("dayOff")
                                        : `${t("satSun")} ${ContactItems.schedule[1]?.from_time} - ${ContactItems.schedule[1]?.to_time}`}
                                </div>
                            </ContactCardText>
                            <ContactLink
                                href={`https://www.google.com/maps?q=${encodeURIComponent(
                                    ContactItems.address
                                )}`}
                                passHref
                            >
                                {t("howToGetThere")}
                            </ContactLink>
                        </ContactCard>
                        <ContactCard>
                            <MailIcon />
                            <Title as="h2" uppercase marginBottom="24px" fontWeight={500}>
                                {t("email")}
                            </Title>
                            <ContactCardText>
                                {isTablet ?
                                    ContactItems.email.replace("@", " @")
                                    : ContactItems.email
                                }
                            </ContactCardText>
                            <ContactLink href={`mailto:${ContactItems.email}`} passHref>
                                {t("toWrite")}
                            </ContactLink>
                        </ContactCard>
                    </ContactsCards>
                </div>
                <ContactsForm />
                <ContactsSocials>
                    <Title as="h2" uppercase marginBottom="24px" fontWeight={500}>
                        {t("socialMedia")}
                    </Title>
                    <Socials text={true} textcolor={theme.colors.black}></Socials>
                </ContactsSocials>
            </ContactsPageWrapper>
        </Container>
    );
};

export default ContactsPage;
