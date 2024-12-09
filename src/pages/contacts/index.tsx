import React from 'react'
import { Container, Title } from '@/styles/components'
import { useAppSelector } from '@/store'
import {
  ContactCard,
  ContactCardText,
  ContactLink,
  ContactsCards,
  ContactsPageWrapper,
  ContactsSocials,
} from './style'
import PhoneIcon from '@/components/global/icons/contacts/PhoneIcon/PhoneIcon'
import MailIcon from '@/components/global/icons/contacts/MailIcon/MailIcon'
import AddressIcon from '@/components/global/icons/contacts/AddressIcon/AddressIcon'
import { Socials } from '@/components/menus/Socials'
import theme from '@/styles/theme'
import Breadcrumbs from '@/components/global/Breadcrumbs/Breadcrumbs'
import ContactsForm from '@/components/pages/contacts/ContactsForm/ContactsForm'
import { useTranslations } from 'next-intl'
import { useResponsive } from '@/hooks/useResponsive'
import { Skeleton } from '@mui/material'

const ContactsPage = () => {
  const t = useTranslations('Contacts')
  const tBreadcrumbs = useTranslations('Breadcrumbs')
  const { isTablet } = useResponsive()
  const themeOptions = useAppSelector((state) => state.themeOptions)
  const ContactItems = themeOptions.data.item.contacts

  const breadcrumbsLinks = [
    { name: tBreadcrumbs('homePage'), url: '/' },
    { name: t('contacts'), url: '/contacts' },
  ]

  return (
    <Container>
      <ContactsPageWrapper>
        <div>
          <Breadcrumbs links={breadcrumbsLinks} />
          <Title as="h2" uppercase marginBottom="24px" marginTop="12px">
            {t('contacts')}
          </Title>
          <ContactsCards>
            <ContactCard>
              <PhoneIcon />
              <Title as="h2" uppercase marginBottom="24px" fontWeight={500}>
                {t('telephone')}
              </Title>
              <ContactCardText>
                {ContactItems?.phone ? ContactItems.phone : <Skeleton width="100%" />}
              </ContactCardText>
              <ContactLink
                href={ContactItems?.phone ? `tel:${ContactItems.phone}` : '#'}
                passHref
              >
                {t('call')}
              </ContactLink>
            </ContactCard>
            <ContactCard>
              <AddressIcon />
              <Title as="h2" uppercase marginBottom="24px" fontWeight={500}>
                {t('address')}
              </Title>
              <ContactCardText>
                {ContactItems?.address ? (
                  <>
                    {ContactItems.address}
                    <div>
                      {t('schedule')}: {ContactItems.schedule[0]?.from_time} -{' '}
                      {ContactItems.schedule[0]?.to_time} <br />
                      {ContactItems.schedule[1]?.not_working
                        ? t('dayOff')
                        : `${t('satSun')} ${ContactItems.schedule[1]?.from_time} - ${
                            ContactItems.schedule[1]?.to_time
                          }`}
                    </div>
                  </>
                ) : (
                  <Skeleton width="100%" height="100%" />
                )}
              </ContactCardText>
              <ContactLink
                href={
                  ContactItems?.address
                    ? `https://www.google.com/maps?q=${encodeURIComponent(
                        ContactItems.address
                      )}`
                    : '#'
                }
                passHref
              >
                {t('howToGetThere')}
              </ContactLink>
            </ContactCard>
            <ContactCard>
              <MailIcon />
              <Title as="h2" uppercase marginBottom="24px" fontWeight={500}>
                {t('email')}
              </Title>
              <ContactCardText>
                {ContactItems?.email ? (
                  isTablet ? (
                    ContactItems.email.replace('@', ' @')
                  ) : (
                    ContactItems.email
                  )
                ) : (
                  <Skeleton width="100%" />
                )}
              </ContactCardText>
              <ContactLink
                href={ContactItems?.email ? `mailto:${ContactItems.email}` : '#'}
                passHref
              >
                {t('toWrite')}
              </ContactLink>
            </ContactCard>
          </ContactsCards>
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
  )
}

export default ContactsPage
