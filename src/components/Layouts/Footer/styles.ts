import { Accordion,  AccordionDetails,  AccordionSummary } from "@mui/material";
import styled from "@emotion/styled";
import { FooterContainerProps } from "@/types/layouts/Footer";

import Link from "next/link";
import Image from "next/image";
import theme from "@/styles/theme";
import { Container } from "@/styles/components";

//---------------TITLES-------------
export const FooterTitle = styled.h3`
   font: ${({ theme }) => theme.fonts.titleH2Medium};
    margin: 0;
    text-transform: uppercase;
    white-space: nowrap;
`;
export const FooterSecondTitle = styled.h3`
    color:  ${({ theme }) => theme.colors.white};
    font: ${({ theme }) => theme.fonts.bodyMiddleReg};
    text-transform: uppercase;
    margin: 0;
    margin-right: 24px;
`;
//---------------LOGO-------------
export const FooterLogoImage = styled(Image)`
  @media ${({ theme }) => theme.media.medium} {
    width: 129px;
    height: 116px;
  }
`;
export const FooterLogoWrapper = styled.div`
    margin-right:36px;
    display: flex;
    align-items: start;
`;
//---------------GRID & CONTAINERS-------------
export const FooterGridContainer = styled.div`
    width:100%;
    margin-bottom:25px; 
    display: grid;
    grid-template-columns:  repeat(3, 1fr) 1.5fr;
    gap: 53px; 
    @media ${({ theme }) => theme.media.largePlus} {
        gap: 24px; 
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(2, 1fr);
    } 
     @media ${({ theme }) => theme.media.medium} {
        display: flex;         
        flex-direction: column;
    } 
`;
export const FooterContainer = styled(Container)<FooterContainerProps>`
    padding: 50px 80px 24px 80px;
    @media ${({ theme }) => theme.media.extraLarge} {
        padding: 50px 32px 24px 32px; 
    } 
    @media ${({ theme }) => theme.media.medium} {
        padding-bottom:  78px ; 
    } 
`;
export const FooterWrapper = styled.div<FooterContainerProps>`
    background: ${({ backgroundColor }) => backgroundColor || theme.colors.backgroundGradient};
    overflow: hidden;
`;

export const FooterMainContentWrapper = styled.div`
    display: flex;
    @media ${({ theme }) => theme.media.medium} {
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }  
`;
export const FooterColumn = styled.div`
`;

// PAYMENT AND DELIVERY
export const PaymentAndDeliveryMethods = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    column-gap:20px;
    row-gap:5px;
    &:first-of-type {
    margin-bottom: 20px;
    } 
`;
export const PaymentAndDeliveryMethodsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    padding: 0;
    
`;

//---------------ACCORDION-------------

export const FooterAccordion = styled(Accordion)`
    color:  ${({ theme }) => theme.colors.white};
    background-color: transparent;
    border: none;
    box-shadow: none;
    width: 100%;
    .MuiAccordionDetails-root { 
        padding: 0;
    }
    .MuiAccordionSummary-expandIconWrapper {
    color: ${({ theme }) => theme.colors.white};
    }
    .MuiAccordionSummary-expandIconWrapper.Mui-expanded {
        color:  ${({ theme }) => theme.colors.white};
        display: none;
    }
    @media ${({ theme }) => theme.media.medium}  {
        .MuiAccordionSummary-expandIconWrapper.Mui-expanded {
            display: flex;
        }
    }
`;
export const AccordionSummaryCustom = styled(AccordionSummary)`
    margin-bottom: 23px;
    padding: 0;
    min-height: fit-content!important;
    .MuiAccordionSummary-content.Mui-expanded {
        color:  ${({ theme }) => theme.colors.white};
        margin: 0;
    }
    @media ${({ theme }) => theme.media.medium}{
        margin-bottom: 10px;
        .MuiAccordionSummary-content {
            margin: 0;
        }
    }
`;
export const AccordionDetailsSlider = styled(AccordionDetails)`
     @media ${({ theme }) => theme.media.medium} {
         display: flex;
         justify-content: center;
    } 
`;

//---------------CONTACTS-------------

export const Contact = styled.div`
> *:first-child {
    margin-right: 20px;
    }
   display:flex;
   align-items:center;
   margin-bottom:16px;
`;
export const ContactLink = styled(Link)`
  cursor: pointer;
  color:  ${({ theme }) => theme.colors.white} ;
  text-decoration: none;
`;


