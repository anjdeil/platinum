import React from 'react'
import { Container, Title } from '@/styles/components'
import { ContactsPageWrapper, ContactsSocials } from './style';
import { Socials } from '@/components/menus/Socials';
import theme from '@/styles/theme';
import Breadcrumbs from '@/components/global/Breadcrumbs/Breadcrumbs';
import ContactsForm from '@/components/pages/contacts/ContactsForm/ContactsForm';
import { useTranslations } from 'next-intl';
import { NewsletterSection } from '@/components/sections/NewsletterSection';
import { IsMobileScreen } from '@/components/global/isMobileScreenWrapper';
import { ContactsCards } from '@/components/pages/contacts/contactsCards';

const ContactsPage = () => {
  const t = useTranslations('Contacts');
  const tBreadcrumbs = useTranslations('Breadcrumbs');

  const breadcrumbsLinks = [
    { name: tBreadcrumbs('homePage'), url: '/' },
    { name: t('contacts'), url: '/contacts' },
  ];

  return (
    <>
      <Container>
        <ContactsPageWrapper>
          <div>
            <Breadcrumbs links={breadcrumbsLinks} />
            <Title as="h2" uppercase marginBottom="24px" marginTop="12px">
              {t('contacts')}
            </Title>
            <ContactsCards />
          </div>
          <ContactsForm />
          <ContactsSocials>
            <Title as="h2" uppercase marginBottom="24px" fontWeight={500}>
              {t('socialMedia')}
            </Title>
            <Socials text={true} textcolor={theme.colors.black}></Socials>
          </ContactsSocials>
        </ContactsPageWrapper>
      </Container>
      <IsMobileScreen>
        <NewsletterSection />
      </IsMobileScreen>
    </>
  );
};

export default ContactsPage
