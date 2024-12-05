import { Text } from '@/styles/components';
import styled from '@emotion/styled';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';

export const StyledSortAccordion = styled(Accordion)`
  box-shadow: none;
  position: relative;

  &::before {
    display: none;
  }

  @media ${({ theme }) => theme.media.medium} {
    & .MuiAccordionSummary-root {
      min-height: unset;
    }

    & .MuiAccordionSummary-content {
      margin-block: 8px;
    }
  }
`;

export const StyledSortAccordionSummary = styled(AccordionSummary) <{ expanded: boolean }>`
  display: flex;
  justify-content: space-between;
  gap: 24px;
  align-items: center;
  cursor: pointer;
  padding-inline: 10px;
  border-radius: ${({ expanded }) => (expanded ? '8px 8px 0 0' : '8px')} !important;
  background-color: ${({ theme }) => theme.background.secondary};
  width: 100%;
`;

export const StyledSortDetails = styled(AccordionDetails)`
  min-width: fit-content;
  position: absolute;
  padding: 0;
  top: 99%;
  left: 0;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 0 0 8px 8px;
  z-index: 11;
  overflow: hidden;
  white-space: nowrap;
`;

export const StyledText = styled(Text)`
  font: ${({ theme }) => theme.fonts.bodyMiddleReg};
  color: ${({ theme }) => theme.colors.black};

  @media ${({ theme }) => theme.media.large} {
    font-size: 14px;
  }
`;

export const StyledSortItem = styled.div<{ isSelected: boolean }>`
  padding: 12px 16px;
  cursor: pointer;
  border: none;
  color: ${({ theme }) => theme.colors.black};
  background-color: ${({ isSelected, theme }) =>
    isSelected ? theme.background.secondary : 'transparent'};
    
  @media ${({ theme }) => theme.media.large} {
    font-size: 14px;
  }

  &:hover {
    background-color: ${({ theme }) => theme.background.secondary};
  }
`;