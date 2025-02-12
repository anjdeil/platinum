import styled from '@emotion/styled';
import { Accordion, AccordionSummary } from '@mui/material';

export const AccordionTitle = styled.h3``;
//---------------ACCORDION------------- from footer

export const CustomAccordionStyled = styled(Accordion)`
  margin: 0;
  width: 100%;
  &.Mui-expanded {
    margin: 0px;
  }

  .MuiAccordionSummary-expandIconWrapper.Mui-expanded {
    display: none;
  }
  @media ${({ theme }) => theme.media.medium} {
    .MuiAccordionSummary-expandIconWrapper.Mui-expanded {
      display: flex;
    }
  }
`;

export const CustomAccordionSummary = styled(AccordionSummary)`
  @media ${({ theme }) => theme.media.medium} {
    margin-bottom: 10px;
    .MuiAccordionSummary-content {
      margin: 0;
    }
  }
`;

/* export const FooterAccordion = styled(Accordion)`
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
`; */
