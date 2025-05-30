import Signature from '@/components/global/signature/Signature';
import VerticalSlider from '@/components/global/sliders/VerticalSliderMenu/VerticalSliderMenu';
import Nav from '@/components/menus/Nav/Nav';
import { Socials } from '@/components/menus/Socials';
import { useAppSelector } from '@/store';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useMediaQuery } from '@mui/material';
import AccordionDetails from '@mui/material/AccordionDetails';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { FC, useState } from 'react';
import {
  AccordionDetailsSlider,
  AccordionDetailsWrapper,
  AccordionSummaryCustom,
  Contact,
  ContactLink,
  ContactsContent,
  FooterAccordion,
  FooterColumn,
  FooterContainer,
  FooterGridContainer,
  FooterLogoImage,
  FooterLogoWrapper,
  FooterMainContentWrapper,
  FooterSecondTitle,
  FooterTitle,
  FooterWrapper,
  PaymentAndDeliveryMethods,
  PaymentAndDeliveryMethodsContainer,
  TabletWrapper,
} from './styles';
import { NavLink } from '@/components/menus/Nav/styles';
import { MenuSkeleton } from '@/components/menus/MenuSkeleton';

export const Footer: FC = () => {
  const t = useTranslations('Footer');
  const tContacts = useTranslations('Contacts');
  const themeOptions = useAppSelector(state => state.themeOptions);
  const ContactItems = themeOptions.data.item.contacts;
  const isMobile = useMediaQuery('(max-width: 767px)');
  const isTablet = useMediaQuery('(max-width: 1300px)');

  const [expanded, setExpanded] = useState<string | false>(
    !isMobile ? 'panel1' : false
  );

  const handleChange = (panel: string) => (_: unknown, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const myAccount = (
    <FooterColumn>
      <FooterAccordion
        expanded={!isMobile || expanded === 'panel1'}
        onChange={handleChange('panel1')}
      >
        <AccordionSummaryCustom
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <FooterTitle>{t('myAccount')}</FooterTitle>
        </AccordionSummaryCustom>
        <AccordionDetails>
          <AccordionDetailsWrapper>
            <Nav
              skeleton={{
                direction: 'column',
                elements: 4,
                width: '160px',
                height: '24px',
                gap: '10px',
              }}
              lineHeight="22px"
              menuId={19409}
              direction="column"
              gap="16px"
              mobGap="8px"
              align="flex-start"
              textalign="left"
            ></Nav>
          </AccordionDetailsWrapper>
        </AccordionDetails>
      </FooterAccordion>
    </FooterColumn>
  );
  const categories = (
    <FooterColumn>
      <FooterAccordion
        expanded={!isMobile || expanded === 'panel2'}
        onChange={handleChange('panel2')}
      >
        <AccordionSummaryCustom
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <FooterTitle>{t('categories')}</FooterTitle>
        </AccordionSummaryCustom>
        <AccordionDetailsSlider>
          <AccordionDetailsWrapper>
            <VerticalSlider
              menuId={344}
              skeleton={{
                direction: 'column',
                elements: 4,
                width: '100%',
                height: '24px',
                gap: '10px',
              }}
            />
          </AccordionDetailsWrapper>
        </AccordionDetailsSlider>
      </FooterAccordion>
    </FooterColumn>
  );

  const info = (
    <FooterColumn>
      <FooterAccordion
        expanded={!isMobile || expanded === 'panel3'}
        onChange={handleChange('panel3')}
      >
        <AccordionSummaryCustom
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`"panel3a-content"`}
          id="panel3a-header"
        >
          <FooterTitle>{t('information')}</FooterTitle>
        </AccordionSummaryCustom>
        <AccordionDetails>
          <AccordionDetailsWrapper>
            <Nav
              menuId={19450}
              skeleton={{
                direction: 'column',
                elements: 4,
                width: '160px',
                height: '24px',
                gap: '10px',
              }}
              lineHeight="22px"
              direction="column"
              gap="16px"
              mobGap="8px"
              align="flex-start"
              textalign="left"
            ></Nav>
          </AccordionDetailsWrapper>
        </AccordionDetails>
      </FooterAccordion>
    </FooterColumn>
  );
  const contacts = (
    <FooterColumn>
      <FooterAccordion
        expanded={!isMobile || expanded === 'panel4'}
        onChange={handleChange('panel4')}
      >
        <AccordionSummaryCustom
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`"panel4a-content"`}
          id="panel4a-header"
        >
          {isMobile ? (
            <FooterTitle>{t('contacts')}</FooterTitle>
          ) : (
            <NavLink href={'/contacts'} passHref>
              <FooterTitle>{t('contacts')}</FooterTitle>
            </NavLink>
          )}
        </AccordionSummaryCustom>
        <AccordionDetails>
          <AccordionDetailsWrapper>
            <ContactsContent>
              {ContactItems ? (
                <div>
                  <Contact>
                    <Image
                      src="/assets/icons/contact_place.svg"
                      alt="contact place"
                      width={24}
                      height={24}
                    />
                    <ContactLink
                      href={
                        ContactItems?.address
                          ? `https://www.google.com/maps?q=${encodeURIComponent(
                              ContactItems.address
                            )}`
                          : '#'
                      }
                      passHref
                      target="_blank"
                    >
                      {ContactItems.address}
                    </ContactLink>
                  </Contact>
                  <Contact>
                    <Image
                      src="/assets/icons/contact_phone.svg"
                      alt="contact phone"
                      width={24}
                      height={24}
                    />
                    <ContactLink
                      href={
                        ContactItems?.phone ? `tel:${ContactItems.phone}` : '#'
                      }
                      passHref
                    >
                      {ContactItems.phone}
                    </ContactLink>
                  </Contact>
                </div>
              ) : (
                <div>
                  <MenuSkeleton
                    elements={2}
                    direction="column"
                    width="200px"
                    height="24px"
                    gap="16px"
                  />
                </div>
              )}
              {ContactItems ? (
                <div>
                  <Contact>
                    <Image
                      src="/assets/icons/contact_mail.svg"
                      alt="contact mail"
                      width={24}
                      height={24}
                    />
                    <ContactLink
                      href={
                        ContactItems?.email
                          ? `mailto:${ContactItems.email}`
                          : '#'
                      }
                      passHref
                    >
                      {ContactItems.email}
                    </ContactLink>
                  </Contact>
                  <Contact>
                    <Image
                      src="/assets/icons/contact_time.svg"
                      alt="contact time"
                      width={24}
                      height={24}
                    />
                    <p>
                      {tContacts('schedule', {
                        from: ContactItems.schedule[0]?.from_time,
                        to: ContactItems.schedule[0]?.to_time,
                      })}
                      <br />
                      {ContactItems.schedule[1]?.not_working
                        ? tContacts('dayOff')
                        : `${tContacts('satSun', {
                            from: ContactItems.schedule[1]?.from_time,
                            to: ContactItems.schedule[1]?.to_time,
                          })}`}
                    </p>
                  </Contact>
                  <Socials
                    iconscolor="white"
                    margin="16px 0 0 0"
                    text={false}
                    itemmargin="16px"
                  />
                </div>
              ) : (
                <div>
                  <MenuSkeleton
                    marginTop="16px"
                    elements={2}
                    direction="column"
                    width="200px"
                    height="24px"
                    gap="16px"
                  />
                </div>
              )}
            </ContactsContent>
          </AccordionDetailsWrapper>
        </AccordionDetails>
      </FooterAccordion>
    </FooterColumn>
  );

  const mobColumns = ['myAccount', 'info', 'contacts', 'categories'];
  const tabletColumns = ['myAccount', 'info', 'categories'];
  const columns = ['myAccount', 'categories', 'info', 'contacts'];
  const columnComponents: Record<string, JSX.Element> = {
    myAccount,
    info,
    contacts,
    categories,
  };

  return (
    <FooterWrapper>
      <FooterContainer>
        <FooterMainContentWrapper>
          <FooterLogoWrapper>
            <Link href={'/'} passHref>
              <FooterLogoImage
                src="/assets/icons/logo_white.png"
                alt="Logo"
                width={175}
                height={133}
              />
            </Link>
          </FooterLogoWrapper>
          {isTablet && !isMobile ? (
            <TabletWrapper>
              <FooterGridContainer>
                {tabletColumns.map(col => (
                  <div key={col}>{columnComponents[col]}</div>
                ))}
              </FooterGridContainer>
              {contacts}
              <PaymentAndDeliveryMethodsContainer>
                <PaymentAndDeliveryMethods>
                  <FooterSecondTitle>{t('delivery')}</FooterSecondTitle>
                  <Image
                    src="/assets/icons/del_inpost-logo.svg"
                    alt="Logo"
                    width={41}
                    height={22}
                  />
                  <Image
                    src="/assets/icons/del_gls-logo.svg"
                    alt="Logo"
                    width={48}
                    height={16}
                  />
                  <Image
                    src="/assets/icons/del_polmail-logo.svg"
                    alt="Logo"
                    width={88}
                    height={20}
                  />
                </PaymentAndDeliveryMethods>
                <PaymentAndDeliveryMethods>
                  <FooterSecondTitle>{t('payments')}</FooterSecondTitle>
                  <Image
                    src="/assets/icons/pay_blik-logo.svg"
                    alt="Logo"
                    width={41}
                    height={22}
                  />
                  <Image
                    src="/assets/icons/pay_prz-logo.svg"
                    alt="Logo"
                    width={45}
                    height={22}
                  />
                  <Image
                    src="/assets/icons/pay_apple-logo.svg"
                    alt="Logo"
                    width={46}
                    height={22}
                  />
                  <Image
                    src="/assets/icons/pay_visa-logo.svg"
                    alt="Logo"
                    width={46}
                    height={22}
                  />
                  <Image
                    src="/assets/icons/pay_mc-logo.svg"
                    alt="Logo"
                    width={32}
                    height={22}
                  />
                  <Image
                    src="/assets/icons/pay_pp-logo.svg"
                    alt="Logo"
                    width={28}
                    height={22}
                  />
                  <Image
                    src="/assets/icons/pay_g-logo.svg"
                    alt="Logo"
                    width={46}
                    height={22}
                  />
                </PaymentAndDeliveryMethods>
              </PaymentAndDeliveryMethodsContainer>
            </TabletWrapper>
          ) : (
            <FooterGridContainer>
              {isMobile
                ? mobColumns.map(col => (
                    <div key={col}>{columnComponents[col]}</div>
                  ))
                : columns.map(col => (
                    <div key={col}>{columnComponents[col]}</div>
                  ))}
            </FooterGridContainer>
          )}
        </FooterMainContentWrapper>
        {(!isTablet || isMobile) && (
          <PaymentAndDeliveryMethodsContainer>
            <PaymentAndDeliveryMethods>
              <FooterSecondTitle>{t('delivery')}</FooterSecondTitle>
              <Image
                src="/assets/icons/del_inpost-logo.svg"
                alt="Logo"
                width={41}
                height={22}
              />
              <Image
                src="/assets/icons/del_gls-logo.svg"
                alt="Logo"
                width={48}
                height={16}
              />
              <Image
                src="/assets/icons/del_polmail-logo.svg"
                alt="Logo"
                width={88}
                height={20}
              />
            </PaymentAndDeliveryMethods>
            <PaymentAndDeliveryMethods>
              <FooterSecondTitle>{t('payments')}</FooterSecondTitle>
              <Image
                src="/assets/icons/pay_blik-logo.svg"
                alt="Logo"
                width={41}
                height={22}
              />
              <Image
                src="/assets/icons/pay_prz-logo.svg"
                alt="Logo"
                width={45}
                height={22}
              />
              <Image
                src="/assets/icons/pay_apple-logo.svg"
                alt="Logo"
                width={46}
                height={22}
              />
              <Image
                src="/assets/icons/pay_visa-logo.svg"
                alt="Logo"
                width={46}
                height={22}
              />
              <Image
                src="/assets/icons/pay_mc-logo.svg"
                alt="Logo"
                width={32}
                height={22}
              />
              <Image
                src="/assets/icons/pay_pp-logo.svg"
                alt="Logo"
                width={28}
                height={22}
              />
              <Image
                src="/assets/icons/pay_g-logo.svg"
                alt="Logo"
                width={46}
                height={22}
              />
            </PaymentAndDeliveryMethods>
          </PaymentAndDeliveryMethodsContainer>
        )}

        <Signature />
      </FooterContainer>
    </FooterWrapper>
  );
};
