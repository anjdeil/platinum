import React from "react";
import { Container, Title } from "@/styles/components";
import { useAppSelector } from "@/store";
import { ContactCard, ContactCardText, ContactLink, ContactsCards, ContactsPageWrapper, ContsctsSocials, FormButton, FormInput, FormTextarea, FormTitle, FormWrapper } from "./style";
import PhoneIcon from "@/components/global/icons/contacts/PhoneIcon/PhoneIcon";
import MailIcon from "@/components/global/icons/contacts/MailIcon/MailIcon";
import AddressIcon from "@/components/global/icons/contacts/AddressIcon/AddressIcon";
import { Socials } from "@/components/menus/Socials";
import theme from "@/styles/theme";

const ContactsPage = () => {
    const themeOptions = useAppSelector(state => state.themeOptions);
    const ContactItems = themeOptions.data.item.contacts;

    console.log(themeOptions);

    return (
        <Container>
            <ContactsPageWrapper>
                <div>
                    <Title as='h2' uppercase marginBottom='24px'>contacts</Title>
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
                <FormWrapper>
                    <FormTitle>ASK US A QUESTION</FormTitle>
                    <FormInput type="text" placeholder="What is your name" />
                    <FormInput type="email" placeholder="Email" />
                    <FormTextarea placeholder="Write your question" rows={5} />
                    <FormButton>Send a question</FormButton>
                </FormWrapper>
                <ContsctsSocials>
                    <Title as='h2' uppercase marginBottom='24px' fontWeight={500}>We are in social media</Title>
                    <Socials text={true} textcolor={theme.colors.black} ></Socials>
                </ContsctsSocials>

            </ContactsPageWrapper>

        </Container>
    );
};

export default ContactsPage;
