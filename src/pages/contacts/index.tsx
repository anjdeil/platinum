import React, { useState } from "react";
import { Container, Title } from "@/styles/components";
import { useAppSelector } from "@/store";
import { ContactCard, ContactCardText, ContactLink, ContactsCards, ContactsPageWrapper, ContsctsSocials, } from "./style";
import PhoneIcon from "@/components/global/icons/contacts/PhoneIcon/PhoneIcon";
import MailIcon from "@/components/global/icons/contacts/MailIcon/MailIcon";
import AddressIcon from "@/components/global/icons/contacts/AddressIcon/AddressIcon";
import { Socials } from "@/components/menus/Socials";
import theme from "@/styles/theme";
import { useRouter } from "next/router";
import Breadcrumbs from "@/components/global/Breadcrumbs/Breadcrumbs";
import { BreadcrumbType } from "@/types/components/global/breadcrumbs";
import ContactsForm from "@/components/pages/contacts/ContactsForm/ContactsForm";

const ContactsPage = () => {
    const themeOptions = useAppSelector(state => state.themeOptions);
    const ContactItems = themeOptions.data.item.contacts;
    const router = useRouter();

    // Получаем текущий маршрут
    const currentPath = router.asPath;

    // Разбиваем маршрут на части
    const pathParts = currentPath.split('/').filter(part => part);

    // Создаем слаги для хлебных крошек
    const breadcrumbsLinks = pathParts.map((part, index) => {
        const url = `/${pathParts.slice(0, index + 1).join('/')}`;
        return { name: part.charAt(0).toUpperCase() + part.slice(1), url };
    });

    const breadcrumbsLinksMock = [
        { name: 'Home Page', url: '/' },
        { name: 'Contacts', url: '/contacts' }
    ];



    return (
        <Container>
            <ContactsPageWrapper>
                <div>
                    <Breadcrumbs links={breadcrumbsLinksMock} />
                    <Title as='h2' uppercase marginBottom='24px' marginTop="12px">contacts</Title>
                    <ContactsCards>
                        <ContactCard>
                            <PhoneIcon />
                            <Title as='h2' uppercase marginBottom='24px' fontWeight={500}>telephone</Title>
                            <ContactCardText>
                                {ContactItems.phone}
                            </ContactCardText>
                            <ContactLink href={`tel:${ContactItems.phone}`} passHref>
                                Call
                            </ContactLink>
                        </ContactCard>
                        <ContactCard>
                            <AddressIcon />
                            <Title as='h2' uppercase marginBottom='24px' fontWeight={500}>Address</Title>
                            <ContactCardText>
                                {ContactItems.address}
                                <p>
                                    Mon-Fri: from {ContactItems.schedule[0]?.from_time}  to {ContactItems.schedule[0]?.to_time} <br />
                                    {ContactItems.schedule[1]?.not_working ?
                                        'Sat-Sun: Day off' :
                                        `Sat-Sun: from ${ContactItems.schedule[1]?.from_time} to ${ContactItems.schedule[1]?.to_time}`}
                                </p>
                            </ContactCardText>
                            <ContactLink href={`https://www.google.com/maps?q=${encodeURIComponent(ContactItems.address)}`} passHref>
                                How to get there?
                            </ContactLink>
                        </ContactCard>
                        <ContactCard>
                            <MailIcon />
                            <Title as='h2' uppercase marginBottom='24px' fontWeight={500}>EMail</Title>
                            <ContactCardText>
                                {ContactItems.email}
                            </ContactCardText>
                            <ContactLink href={`mailto:${ContactItems.email}`} passHref>
                                To write
                            </ContactLink>
                        </ContactCard>
                    </ContactsCards>
                </div>
                <ContactsForm />
                <ContsctsSocials>
                    <Title as='h2' uppercase marginBottom='24px' fontWeight={500}>We are in social media</Title>
                    <Socials text={true} textcolor={theme.colors.black} ></Socials>
                </ContsctsSocials>

            </ContactsPageWrapper>

        </Container>
    );
};

export default ContactsPage;
