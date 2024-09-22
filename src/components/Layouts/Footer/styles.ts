import { Accordion, AccordionSummary } from "@mui/material";
import styled from "@emotion/styled";
import Nav from "../Nav/Nav";
import theme from "@/styles/theme";

export const FooterGridContainer = styled.div`
    width:100%;
    margin-bottom:25px;
    display: grid;
    grid-template-columns:  repeat(3, 1fr) 1.5fr;
    gap: 53px;
     @media (max-width: 1100px) {
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(2, 1fr);
    } 
     @media (max-width: 768px) {
        display: flex;           // кривое решение но на гридах аккордион увеличивает высоту при открытии первых двух элементов
        flex-direction: column;
    } 
    
`;
export const FooterContainer = styled.div`
overflow: hidden;
    background: ${theme.colors.backgroundGradient};
    padding: 50px 80px 24px 80px;
    @media (max-width: 768px) {
        padding: 50px 32px 24px 32px;
    } 
    
`;
export const FooterMainWrapper = styled.div`
    display: flex;
    @media (max-width: 340px) {

        flex-direction: column;
        align-items: center;
        justify-content: center;
    } 

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
  
    /*  @media (max-width: 340px) {
      flex-direction:column;
      align-items: center;
      justify-content: center
    }  */
`;

export const PaymentAndDeliveryMethodsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;

`;

export const FooterColumn = styled.div`
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
    .MuiAccordionSummary-expandIconWrapper {
    color: ${theme.colors.white};
  }
    .MuiAccordionSummary-expandIconWrapper.Mui-expanded {
        color:  ${theme.colors.white};
        display: none;
    }
    @media (max-width: 768px) {
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
        color:  ${theme.colors.white};
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
   font: ${theme.fonts.titleH2Medium} !important;
    margin: 0;
    text-transform: uppercase;
    white-space: nowrap;
`;

export const Contact = styled.div`
> *:first-child {
    margin-right: 20px;
}
   display:flex;
   align-items:center;
   margin-bottom:16px;
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
margin-right:36px;
    width: 10vw;
   max-height: 158px;
    display: flex;
    align-items: center;
    & a {
        width: 100%;
        display: flex;
        align-items: center;
    }
`;