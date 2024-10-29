import { ListProps, SideListContainerProps, StyledListItemrops } from "@/types/components/global/sideList";
import styled from "@emotion/styled";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";


export const StyledAccordion = styled(Accordion)`
    margin: 0;
    border: 1px solid #ddd;
    border-radius: 4px;
    &:not(:last-child) {
        border-bottom: 0;
    }
    &:before {
        display: none;
    }
`;

export const StyledAccordionSummary = styled(AccordionSummary)`
    background-color: #f5f5f5;
    border-bottom: 1px solid #ddd;
    margin: 0;
    min-height: 48px;
    & .MuiAccordionSummary-expandIcon {
        color: #000;
    }
`;

export const StyledAccordionDetails = styled(AccordionDetails)`
    padding: 16px;
`;

