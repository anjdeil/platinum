import { Accordion, AccordionSummary, Checkbox } from '@mui/material';
import styled from 'styled-components';

export const StyledAccordion = styled(Accordion)`
  box-shadow: none;
  border-radius: 10px !important;

  .MuiAccordionSummary-root {
    border-radius: 10px !important;
    background-color: #f0f7ff;
  }
  

  .MuiCollapse-root.MuiCollapse-vertical {
    background-color: white;
  }
`;

export const StyledAccordionSummary = styled(AccordionSummary)`
  & .MuiAccordionSummary-content {
    margin: 0;
  }
`;