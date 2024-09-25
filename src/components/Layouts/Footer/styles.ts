import { Accordion,  AccordionSummary } from "@mui/material";
import styled from "@emotion/styled";

import { FooterContainerProps } from "@/types/layouts/Footer";
import Link from "next/link";
import Image from "next/image";

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
  @media ${({ theme }) => theme.media.xl} {
    width: 100px;
    height: 90px;
  }
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
    @media ${({ theme }) => theme.media.middle} {
        gap: 24px; //
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(2, 1fr);
    } 
     @media ${({ theme }) => theme.media.medium} {
        display: flex;           // кривое решение но на гридах аккордион увеличивает высоту при открытии первых двух элементов
        flex-direction: column;
    } 
`;
export const FooterContainer = styled.div<FooterContainerProps>`
    background: ${({ backgroundColor }) =>
        backgroundColor || 'radial-gradient(79.43% 79.43% at 49.95% 64.07%, #024584 0%, #0B233D 100%)'};
    overflow: hidden;
    padding: 50px 80px 24px 80px;
    @media ${({ theme }) => theme.media.medium} {
        padding: 50px 32px 24px 32px; 
    } 
`;
export const FooterMainWrapper = styled.div`
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
        > *:not(:first-child) {
    margin-right: 21px;
    }
     &:not(:last-of-type) {
   
    margin-bottom: 20px;
    }
    flex-wrap: wrap;
`;
export const PaymentAndDeliveryMethodsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    padding: 0;
    @media ${({ theme }) => theme.media.medium} {
         padding-bottom: 50px;
    } 
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
  color:  ${({ theme }) => theme.colors.white} ;
  text-decoration: none;
`;


