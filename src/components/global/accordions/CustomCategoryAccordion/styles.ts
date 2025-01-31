import { Text } from '@/styles/components';
import styled from '@emotion/styled';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';

export const StyledSortAccordion = styled(Accordion)`
  box-shadow: none;
  position: relative;
  width: 100%;

  &::before {
    display: none;
  }

  @media ${({ theme }) => theme.media.medium} {
    & .MuiAccordionSummary-root {
      min-height: unset;
    }

    & .MuiAccordionSummary-content {
      margin-block: 0;
    }
  }
`;

export const StyledSortAccordionSummary = styled(AccordionSummary)`
  display: flex;
  justify-content: space-between;
  gap: 24px;
  align-items: center;
  cursor: pointer;
  padding: 12px 16px;
  border-radius: 8px !important;
  background-color: ${({ theme }) => theme.background.secondary};
  width: 100%;
`;

export const StyledSortDetails = styled(AccordionDetails)`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  margin-top: 16px;
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
  color: ${({ isSelected, theme }) =>
    isSelected ? theme.colors.black : theme.colors.grey};
  background-color: ${({ theme }) => theme.background.secondary};
  border-radius: 8px;
    
  @media ${({ theme }) => theme.media.large} {
    font-size: 14px;
  }

  &:hover {
    background-color: ${({ theme }) => theme.background.secondary};
  }
`;