import styled from 'styled-components';
import { useMediaQuery } from '@mui/material';
/* import Socials from "../Socials/Socials"; */

/* import { SliderMenu } from "../SliderMenu";
import { SubscriptionForm } from "@/components/Forms"; */

import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useContext, useState } from 'react';
import { AccordionSummaryCustom, FooterAccordion, FooterColumn, FooterContainer, FooterGridContainer, FooterLogoWrapper, FooterNav, FooterSecondTitle, FooterTitle, PaymentAndDeliveryMethods, PaymentAndDeliveryMethodsContainer, } from './styles';
import Link from 'next/link';
import Image from 'next/image';
import { VerticalSliderMenu } from '../VerticalSliderMenu';




export const Footer = () => {

    const isMobile = useMediaQuery('(max-width: 768px)');
    const [expanded, setExpanded] = useState<string | false>(!isMobile ? 'panel1' : false);

    const handleChange = (panel: string) => (_: unknown, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };


    return (
        <FooterContainer >
            <FooterGridContainer>
            <FooterColumn>
                <FooterLogoWrapper>
                    <Link href={'/'} passHref>
                        <Image src="/assets/icons/logo_white.svg" alt="Logo" width={176} height={158} unoptimized={true} />
                    </Link>
                </FooterLogoWrapper>
            </FooterColumn>
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
                        <FooterNav menuId={1} ></FooterNav>
                        <p>1</p>
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
                    <AccordionDetails>
                        <p>1</p>
                        <VerticalSliderMenu menuId={1}/> 
                    </AccordionDetails>
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
                    <AccordionDetails>
                        <p>1</p>
                        {/*   <FooterNav menuId={2} />   */}
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
                        <p>1</p>
                        <FooterNav menuId={3} />
                    </AccordionDetails>
                </FooterAccordion>
            </FooterColumn>
            </FooterGridContainer>
          
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
