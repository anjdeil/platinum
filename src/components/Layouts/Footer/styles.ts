import { Accordion, AccordionSummary } from "@mui/material";
import styled from "styled-components";

import theme from "../../../styles/theme";
import Nav from "../Nav/Nav";

export const FooterGridContainer = styled.div`

    display: grid;
    grid-template-columns: 175px repeat(3, 1fr) 1.5fr;
    gap: 53px;

     @media (max-width: 768px) {
        grid-template-columns: 1fr;
    } 
    margin-bottom: 30px
`;
export const FooterContainer = styled.div`
    background-color: ${theme.colors.primary};
    padding: 50px 80px 24px 80px;
    
`;
export const PaymentAndDeliveryMethods = styled.div`
   
    display: flex;
    justify-content: start;
    align-items: center;
        > *:not(:first-child) {
    margin-right: 21px;
  }
  &:not(:last-of-type) {
    margin-bottom: 20px;
  }
`;





export const PaymentAndDeliveryMethodsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;

`;

export const FooterColumn = styled.div`

   /*  &:first-child {
        justify-self: start;
    }
    &:nth-child(2) {
        justify-self: center;
    }
    &:nth-child(3) {
        justify-self: center;
    }
    &:last-child {
        justify-self: end;
    } */
`;

export const FooterAccordion = styled(Accordion)`
  color:  ${theme.colors.white};
    background-color: transparent;
    border: none;
    box-shadow: none;
    width: 100%;
    .MuiCollapse-wrapperInner {
        display: flex;
    }
    &::before {
        display: none;
    }
    .MuiAccordionDetails-root {
        padding: 0;
    }
    .MuiAccordionSummary-expandIconWrapper.Mui-expanded {
        display: none;
    }
    @media (max-width: 992px) {
        .MuiAccordionSummary-expandIconWrapper.Mui-expanded {
            display: flex;
        }
    }
`;

export const AccordionSummaryCustom = styled(AccordionSummary)`
    margin-bottom: 50px;
    padding: 0;
    min-height: fit-content!important;
    .MuiAccordionSummary-content.Mui-expanded {
        margin: 0;
    }
    @media (max-width: 1024px) {
        margin-bottom: 25px;
    }
    @media (max-width: 992px) {
        margin-bottom: 10px;
        .MuiAccordionSummary-content {
            margin: 0;
        }
    }
`;

export const FooterTitle = styled.h3`
    font-size: 1.5rem;
    font-weight: 500;
    line-height: 2rem;
    margin: 0;
    text-transform: uppercase;
`;

export const FooterSecondTitle = styled.h3`
    color:  ${theme.colors.white};
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.5rem;
    text-transform: uppercase;
    margin: 0;
    margin-right: 24px;
`;

export const FooterNav = styled(Nav)`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
`;

/* const FooterMenuSlider = styled(SliderMenu)`
    white-space: nowrap;
    > div {
        padding-top: 20px;
        max-height: 220px;
    }
`;

const FooterSocials = styled(Socials)`
    nav ul {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }
`;
 */
export const FooterLogoWrapper = styled.div`
    width: 175px;
    height: 158px;
    display: flex;
    align-items: center;
    & a {
        width: 100%;
        display: flex;
        align-items: center;
    }
`;