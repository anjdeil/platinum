import { useMediaQuery } from '@mui/material';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FC, useContext, useState } from 'react';
import { AccordionDetailsSlider, AccordionSummaryCustom, Contact, ContactLink, FooterAccordion, FooterColumn, FooterContainer, FooterGridContainer, FooterLogoImage, FooterLogoWrapper, FooterMainContentWrapper, FooterSecondTitle, FooterTitle, FooterWrapper, PaymentAndDeliveryMethods, PaymentAndDeliveryMethodsContainer, } from './styles';
import Link from 'next/link';
import Image from 'next/image';
import VerticalSlider from '../VerticalSliderMenu/VerticalSliderMenu';
import Nav from '../Nav/Nav';
import { Socials } from '../../shared/Socials';

export const Footer: FC = () => {

    const isMobile = useMediaQuery('(max-width: 768px)');

    const [expanded, setExpanded] = useState<string | false>(!isMobile ? 'panel1' : false);

    const handleChange = (panel: string) => (_: unknown, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <FooterWrapper>
        <FooterContainer >
            <FooterMainContentWrapper>
                <FooterLogoWrapper>
                    <Link href={'/'} passHref>
                        <FooterLogoImage
                            src="/assets/icons/logo_white.svg"
                            alt="Logo" width={175} height={158}
                        />
                    </Link>
                </FooterLogoWrapper>
                <FooterGridContainer>
                    <FooterColumn>
                        <FooterAccordion expanded={!isMobile || expanded === 'panel1'} onChange={handleChange('panel1')}>
                            <AccordionSummaryCustom
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <FooterTitle>My account</FooterTitle>
                            </AccordionSummaryCustom>
                            <AccordionDetails>
                                <Nav
                                    skeleton={{
                                        direction: 'column',
                                        elements: 4,
                                        width: "160px",
                                        height: "24px",
                                        gap: '10px'
                                    }}
                                    menuId={335}
                                    direction='column'
                                    gap='16px'
                                    align='flex-start'>
                                </Nav>
                            </AccordionDetails>
                        </FooterAccordion>
                    </FooterColumn>
                    <FooterColumn>
                        <FooterAccordion expanded={!isMobile || expanded === 'panel2'} onChange={handleChange('panel2')}>
                            <AccordionSummaryCustom
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                            >
                                <FooterTitle>Categories</FooterTitle>
                            </AccordionSummaryCustom>
                            <AccordionDetailsSlider>
                                <VerticalSlider
                                    menuId={335}
                                    skeleton={{
                                        direction: 'column',
                                        elements: 4,
                                        width: "160px",
                                        height: "24px",
                                        gap: '10px'
                                    }}
                                />
                            </AccordionDetailsSlider>
                        </FooterAccordion>
                    </FooterColumn>
                    <FooterColumn>
                        <FooterAccordion expanded={!isMobile || expanded === 'panel3'} onChange={handleChange('panel3')}>
                            <AccordionSummaryCustom
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls={`"panel3a-content"`}
                                id="panel3a-header"
                            >
                                <FooterTitle>Information</FooterTitle>
                            </AccordionSummaryCustom>
                            <AccordionDetails >
                                <Nav
                                    menuId={335}
                                    skeleton={{
                                        direction: 'column',
                                        elements: 4,
                                        width: "160px",
                                        height: "24px",
                                        gap: '10px'
                                    }}
                                    direction='column'
                                    gap='16px'
                                    align='flex-start'></Nav>
                            </AccordionDetails>
                        </FooterAccordion>
                    </FooterColumn>
                    <FooterColumn>
                        <FooterAccordion expanded={!isMobile || expanded === 'panel4'} onChange={handleChange('panel4')}>
                            <AccordionSummaryCustom
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls={`"panel4a-content"`}
                                id="panel4a-header"
                            >
                                <FooterTitle>Contacts</FooterTitle>
                            </AccordionSummaryCustom>
                            <AccordionDetails>
                                <Contact>
                                    <Image src="/assets/icons/contact_place.svg" alt="contact place" width={24} height={24} unoptimized={true} />
                                    <ContactLink href="https://www.google.com/maps?q=Poland,+Warsaw,+Kolejowa+45,+location+U6" passHref>
                                        Poland, Warsaw, Kolejowa 45,  location U6
                                    </ContactLink>
                                </Contact>
                                <Contact>
                                    <Image src="/assets/icons/contact_phone.svg" alt="contact phone" width={24} height={24} unoptimized={true} />
                                    <ContactLink href="tel:+48883462736" passHref>
                                        +48883462736
                                    </ContactLink>
                                </Contact>
                                <Contact>
                                    <Image src="/assets/icons/contact_mail.svg" alt="contact mail" width={24} height={24} unoptimized={true} />
                                    <ContactLink href="mailto:polandplatinum@gmail.com" passHref>
                                        polandplatinum@gmail.com
                                    </ContactLink>
                                </Contact>
                                <Contact>
                                    <Image src="/assets/icons/contact_time.svg" alt="contact time" width={24} height={24} unoptimized={true} />
                                    <p>Mon-Fri: from 9-00 to 18-00 <br />
                                        Sat-Sun day is a day off</p>
                                </Contact>
                                <Socials iconscolor='white' margin='16px 0 0 0' text={false} itemMargin='16px'/>
                            </AccordionDetails>
                        </FooterAccordion>
                    </FooterColumn>
                </FooterGridContainer>
            </FooterMainContentWrapper>
            <PaymentAndDeliveryMethodsContainer>
                <PaymentAndDeliveryMethods>
                    <FooterSecondTitle>DELIVERY</FooterSecondTitle>
                    <Image src="/assets/icons/del_inpost-logo.svg" alt="Logo" width={41} height={22} unoptimized={true} />
                    <Image src="/assets/icons/del_gls-logo.svg" alt="Logo" width={48} height={16} unoptimized={true} />
                    <Image src="/assets/icons/del_polmail-logo.svg" alt="Logo" width={88} height={20} unoptimized={true} />
                </PaymentAndDeliveryMethods>
                <PaymentAndDeliveryMethods>
                    <FooterSecondTitle>Payments</FooterSecondTitle>
                    <Image src="/assets/icons/pay_blik-logo.svg" alt="Logo" width={41} height={22} unoptimized={true} />
                    <Image src="/assets/icons/pay_prz-logo.svg" alt="Logo" width={45} height={22} unoptimized={true} />
                    <Image src="/assets/icons/pay_apple-logo.svg" alt="Logo" width={46} height={22} unoptimized={true} />
                    <Image src="/assets/icons/pay_visa-logo.svg" alt="Logo" width={46} height={22} unoptimized={true} />
                    <Image src="/assets/icons/pay_mc-logo.svg" alt="Logo" width={32} height={22} unoptimized={true} />
                    <Image src="/assets/icons/pay_pp-logo.svg" alt="Logo" width={28} height={22} unoptimized={true} />
                    <Image src="/assets/icons/pay_g-logo.svg" alt="Logo" width={46} height={22} unoptimized={true} />
                </PaymentAndDeliveryMethods>
            </PaymentAndDeliveryMethodsContainer>
        </FooterContainer>
        </FooterWrapper>
    )
}
