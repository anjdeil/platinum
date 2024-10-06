import { Accordion, AccordionDetails, AccordionSummary, Box } from "@mui/material";
import styled from "@emotion/styled";
import CustomAccordion from "@/components/shared/Accordion/Accordion";
import { CustomList } from "@/components/shared/List/List";

export const BenefitsTitle = styled.h3`
    font: ${({ theme }) => theme.fonts.titleH2SemiBold};
    text-transform: uppercase;
    font-size: 48px;

    @media ${({ theme }) => theme.media.medium}  {
        font: ${({ theme }) => theme.fonts.bodyMiddleSemiBold};
    }
`

export const BenefitsAccordionDetails = styled(AccordionDetails)`
 margin-top: "16px";
`

export const BenefitsPrice = styled.span`
    font-size: 24px;
    text-transform: uppercase;
    text-align: center;
    white-space: nowrap;

    @media ${({ theme }) => theme.media.medium}  {
        font: ${({ theme }) => theme.fonts.bodyMiddleSemiBold};
    }
`

export const AccordionHeader = styled(Box)` 
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    width: 100%;

    @media ${({ theme }) => theme.media.medium}  {
        flex-direction: row;
        justify-content: space-between;
        gap: 0;
    }
`

export const BenefitsLayout = styled(Box)`
    display: flex;
    flex-direction: row;
    gap: 16px;
    
    margin-bottom: 80px;

    @media ${({ theme }) => theme.media.medium}  {
        display: flex;
        flex-direction: column;
        gap: 24px;
    }

    @media ${({ theme }) => theme.media.small}  {
        margin-bottom: 64px;
    }
`

export const BenefitsItem = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    gap: 16px;

    @media ${({ theme }) => theme.media.medium}  {
        :nth-child(1) {
            width: 50%;
        }
        :nth-child(2) {
            width: 65%;
        }
        :nth-child(3) {
            width: 80%;
        }

        gap: 8px;
    }

    @media ${({ theme }) => theme.media.small}  {
        :nth-child(1) {
            width: 100%;
        }
        :nth-child(2) {
            width: 100%;
        }
        :nth-child(3) {
            width: 100%;
        }

        gap: 8px;
    }
`

export const BenefitsAccordionStyled = styled(Accordion) <{ level: string }>`
    box-sizing: border-box;
    border-radius: 8px !important;
    width: 100%;
    margin: 0;
    padding: 32px;
    box-shadow: none;
    border: none;
    
    background-color: ${({ level }) =>
        level === 'silver' ? '#e0effe' :
            level === 'gold' ? '#1e71be' : '#113760'};
    color: ${({ level }) => (level === 'silver' ? 'black' : 'white')};

    .MuiAccordionSummary-content.Mui-expanded {
        margin: 0;
        justify-content: center;
    }
    
    .MuiAccordionSummary-expandIconWrapper.Mui-expanded {
        display: none;
    }

    .MuiButtonBase-root {
        min-height: 0 !important;
        margin: 0;
    }

    .MuiAccordionDetails-root {
        padding: 0;
        list-style: none;
    }

    &.Mui-expanded {
       margin: 0;
    }

    ::before {
        opacity: 0;
    }

    @media ${({ theme }) => theme.media.medium}  {
        .MuiAccordionSummary-expandIconWrapper {
            display: none;
        }

        padding: 16px 0px;
    }
    
`


export const CustomAccordionSummary = styled(AccordionSummary)`
    margin: 0;
    padding: 0;

    @media ${({ theme }) => theme.media.medium}{
        margin-bottom: 10px;
        .MuiAccordionSummary-content {
          margin: 0;
          justify-content: center;
        }
    }
    
`


export const AccordionTitle = styled.h3`
    font: ${({ theme }) => theme.fonts.bodyMiddleReg};
    text-transform: uppercase;
`;



export const BenefitsInfo = styled(Box)`
    max-width: 600px;
`

export const BenefitsCustomList = styled(CustomList)`
    margin-top: 24px;
    gap: 16px;
`