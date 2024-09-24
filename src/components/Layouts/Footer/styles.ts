import { Accordion, AccordionSummary } from "@mui/material";
import styled from "@emotion/styled";

import { FooterContainerProps } from "@/types/layouts/Footer";

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

export const FooterGridContainer = styled.div`
    width:100%;
    margin-bottom:25px; //
    display: grid;
    
    gap: 53px; //
    display: flex;           // кривое решение но на гридах аккордион увеличивает высоту при открытии первых двух элементов
    flex-direction: column;
     @media ${({ theme }) =>  theme.media.middle} {
        grid-template-columns:  repeat(3, 1fr) 1.5fr;
    } 
     @media ${ ({ theme }) =>  theme.media.medium} {
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(2, 1fr);
    } 
     @media ${ ({ theme }) =>  theme.media.xl} {
       
    } 
`;

export const FooterContainer = styled.div<FooterContainerProps>`
    background: ${({ backgroundColor }) =>
        backgroundColor || 'radial-gradient(79.43% 79.43% at 49.95% 64.07%, #024584 0%, #0B233D 100%)'};
    overflow: hidden;
    padding: 50px 80px 24px 80px; //
    @media ${({ theme }) =>  theme.media.medium} {
        padding: 50px 32px 24px 32px;
    } 
`;

export const FooterMainWrapper = styled.div`
    display: flex;
    /* @media ${({ theme }) => theme.media.small} {
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }  */
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
//ACCORDION

export const FooterAccordion = styled(Accordion)`
  color:  ${({ theme }) =>  theme.colors.white};
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
    color: ${({ theme }) =>  theme.colors.white};
  }
    .MuiAccordionSummary-expandIconWrapper.Mui-expanded {
        color:  ${({ theme }) =>  theme.colors.white};
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
        color:  ${({ theme }) =>  theme.colors.white};
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


export const Contact = styled.div`
> *:first-child {
    margin-right: 20px;
}
   display:flex;
   align-items:center;
   margin-bottom:16px;
`;

