import styled from 'styled-components';
import { useMediaQuery } from '@mui/material';
/* import Socials from "../Socials/Socials"; */

import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FC, useContext, useState } from 'react';
import { AccordionSummaryCustom, Contact, FooterAccordion, FooterColumn, FooterContainer, FooterGridContainer, FooterLogoWrapper, FooterMainWrapper, FooterSecondTitle, FooterTitle, PaymentAndDeliveryMethods, PaymentAndDeliveryMethodsContainer, } from './styles';
import Link from 'next/link';
import Image from 'next/image';
import VerticalSlider from '../VerticalSliderMenu/VerticalSliderMenu';
import Nav from '../Nav/Nav';


export const Footer: FC = () => {

    const isMobile = useMediaQuery('(max-width: 768px)');

    const [expanded, setExpanded] = useState<string | false>(!isMobile ? 'panel1' : false);

    const handleChange = (panel: string) => (_: unknown, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };


    return (
        <FooterContainer >
            <FooterMainWrapper>
                {/* <FooterLogoWrapper>
                    <Link href={'/'} passHref>
                        <Image
                            src="/assets/icons/logo_white.svg"
                            alt="Logo"
                            fill
                            sizes="(max-width: 768px) 1vw, (max-width: 1400px) 1vw"
                        />
                    </Link>
                </FooterLogoWrapper> */}

                <FooterGridContainer>
                    <FooterColumn>
                        <FooterAccordion expanded={!isMobile || expanded === 'panel1'} onChange={handleChange('panel1')}>
                            <AccordionSummaryCustom
                                expandIcon={<ExpandMoreIcon />}
                            /*  aria-controls="panel2a-content"
                             id="panel2a-header" */
                            >
                                <FooterTitle>My account</FooterTitle>
                            </AccordionSummaryCustom>
                            <AccordionDetails>
                                <Nav menuId={1} direction='column' gap='16px' align='flex-start'></Nav>
                            </AccordionDetails>
                        </FooterAccordion>
                    </FooterColumn>
                    <FooterColumn>
                        <FooterAccordion expanded={!isMobile || expanded === 'panel2'} onChange={handleChange('panel2')}>
                            <AccordionSummaryCustom
                                expandIcon={<ExpandMoreIcon />}
                            /*   aria-controls="panel2a-content"
                              id="panel2a-header" */
                            >
                                <FooterTitle>Categories</FooterTitle>
                            </AccordionSummaryCustom>
                            <AccordionDetails>

                                <VerticalSlider menuId={3} />


                            </AccordionDetails>
                        </FooterAccordion>
                    </FooterColumn>
                    <FooterColumn>
                        <FooterAccordion expanded={!isMobile || expanded === 'panel3'} onChange={handleChange('panel3')}>
                            <AccordionSummaryCustom
                                expandIcon={<ExpandMoreIcon />}
                            /*   aria-controls={`"panel3a-content"`}
                              id="panel3a-header" */
                            >
                                <FooterTitle>Information</FooterTitle>
                            </AccordionSummaryCustom>
                            <AccordionDetails>
                                <Nav menuId={1} direction='column' gap='16px' align='flex-start'></Nav>
                            </AccordionDetails>
                        </FooterAccordion>
                    </FooterColumn>
                    <FooterColumn>
                        <FooterAccordion expanded={!isMobile || expanded === 'panel4'} onChange={handleChange('panel4')}>
                            <AccordionSummaryCustom
                                expandIcon={<ExpandMoreIcon />}
                            /*  aria-controls={`"panel4a-content"`}
                             id="panel4a-header" */
                            >
                                <FooterTitle>Contacts</FooterTitle>
                            </AccordionSummaryCustom>
                            <AccordionDetails>
                                <Contact>
                                    <Image src="/assets/icons/contact_place.svg" alt="Logo" width={24} height={24} unoptimized={true} />
                                    <p>Poland, Warsaw, Kolejowa 45, <br /> location U6</p>
                                </Contact>
                                <Contact>
                                    <Image src="/assets/icons/contact_phone.svg" alt="Logo" width={24} height={24} unoptimized={true} />
                                    <p>+48883462736</p>
                                </Contact>
                                <Contact>
                                    <Image src="/assets/icons/contact_mail.svg" alt="Logo" width={24} height={24} unoptimized={true} />
                                    <p>polandplatinum@gmail.com</p>
                                </Contact>
                                <Contact>
                                    <Image src="/assets/icons/contact_time.svg" alt="Logo" width={24} height={24} unoptimized={true} />
                                    <p>Mon-Fri: from 9-00 to 18-00 <br />
                                        Sat-Sun day is a day off</p>
                                </Contact>
                            </AccordionDetails>
                        </FooterAccordion>
                    </FooterColumn>
                </FooterGridContainer>
            </FooterMainWrapper>
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
    )
}
