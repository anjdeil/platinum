import AddressIcon from '@/components/global/icons/contacts/AddressIcon/AddressIcon';
import MailIcon from '@/components/global/icons/contacts/MailIcon/MailIcon';
import PhoneIcon from '@/components/global/icons/contacts/PhoneIcon/PhoneIcon';
import { useResponsive } from '@/hooks/useResponsive';
import { useAppSelector } from '@/store';
import { Title } from '@/styles/components';
import { Skeleton } from '@mui/material';
import { useTranslations } from 'next-intl';
import {
  ContactCard,
  ContactCardText,
  ContactLink,
  ContactsCardsWrapper,
} from './styles';

export const ContactsCards = () => {
  const t = useTranslations('Contacts');
  const themeOptions = useAppSelector(state => state.themeOptions);
  const ContactItems = themeOptions.data.item.contacts;
  const { isTablet } = useResponsive();

  return (
    <ContactsCardsWrapper>
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
                {t('schedule', {
                  from: ContactItems.schedule[0]?.from_time,
                  to: ContactItems.schedule[0]?.to_time,
                })}
                <br />
                {ContactItems.schedule[1]?.not_working
                  ? t('dayOff')
                  : `${t('satSun', {
                      from: ContactItems.schedule[1]?.from_time,
                      to: ContactItems.schedule[1]?.to_time,
                    })}`}
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
    </ContactsCardsWrapper>
  );
};
