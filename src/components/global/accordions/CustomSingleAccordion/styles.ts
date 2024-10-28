import { Accordion, AccordionSummary, Checkbox } from '@mui/material';
import styled from 'styled-components';

export const StyledAccordion = styled(Accordion)`
  box-shadow: none;
  border-radius: 8px;
  background-color: #f0f7ff;
`;

export const StyledAccordionSummary = styled(AccordionSummary)`
  & .MuiAccordionSummary-content {
    margin: 0;
  }
`;