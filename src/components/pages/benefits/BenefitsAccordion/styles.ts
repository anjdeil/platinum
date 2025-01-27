import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
} from '@mui/material';
import styled from '@emotion/styled';
import {
  BenefitsGapProps,
  Level,
} from '@/types/components/pages/benefits/benefitsAccordion';
import { Title } from '@/styles/components';

const shouldForwardProp = (prop: string) =>
  !['gapMedium', 'gapSm', 'gapLg'].includes(prop);

export const BenefitsLayout = styled(Box, {
  shouldForwardProp,
})<BenefitsGapProps>`
  display: flex;
  flex-direction: row;
  gap: ${({ gapMedium = '16px' }) => gapMedium};
  margin-bottom: 80px;
  @media ${({ theme }) => theme.media.medium} {
    display: flex;
    flex-direction: column;
    gap: ${({ gapLg = '24px' }) => gapLg};
  }
  @media ${({ theme }) => theme.media.small} {
    margin-bottom: 64px;
  }
`;

export const BenefitsItem = styled(Box, {
  shouldForwardProp,
})<BenefitsGapProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  gap: ${({ gapMedium = '16px' }) => gapMedium};
  min-width: 30%;
  @media ${({ theme }) => theme.media.medium} {
    :nth-of-type(1) {
      width: 50%;
    }
    :nth-of-type(2) {
      width: 65%;
    }
    :nth-of-type(3) {
      width: 80%;
    }
    gap: ${({ gapSm = '8px' }) => gapSm};
  }
  @media ${({ theme }) => theme.media.small} {
    :nth-of-type(1),
    :nth-of-type(2),
    :nth-of-type(3) {
      width: 100%;
    }
  }
`;

export const BenefitsTitle = styled(Title)`
  font: ${({ theme }) => theme.fonts.titleH2SemiBold};
  text-transform: uppercase;
  font-size: 48px;
  @media ${({ theme }) => theme.media.medium} {
    font: ${({ theme }) => theme.fonts.bodyMiddleSemiBold};
  }
`;

export const BenefitsAccordionDetails = styled(AccordionDetails)`
  margin-top: ${({ theme }) => theme.spacing.medium};
`;

export const BenefitsPrice = styled.span`
  font-size: 24px;
  text-transform: uppercase;
  text-align: center;
  @media ${({ theme }) => theme.media.medium} {
    font: ${({ theme }) => theme.fonts.bodyMiddleSemiBold};
  }
`;

export const BenefitsAccordionStyled = styled(Accordion)<{ level: Level }>`
  border-radius: 8px !important;
  width: 100%;
  margin: 0;
  padding: 32px;
  box-shadow: none;
  border: none;

  background-color: ${({ theme, level }) =>
    level === 'silver'
      ? theme.colors.primaryBlue200
      : level === 'gold'
      ? theme.colors.primaryBlue500
      : theme.colors.primaryBlue700};
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
  @media ${({ theme }) => theme.media.medium} {
    .MuiAccordionSummary-expandIconWrapper {
      display: none;
    }
    padding: 8px 32px;
  }
`;

export const CustomAccordionSummary = styled(AccordionSummary)`
  margin: 0;
  padding: 0;
  @media ${({ theme }) => theme.media.medium} {
    margin-bottom: 10px;
    .MuiAccordionSummary-content {
      margin: 0;
      justify-content: center;
    }
  }
`;

export const AccordionTitle = styled.h3`
  font: ${({ theme }) => theme.fonts.bodyMiddleReg};
  text-transform: uppercase;
`;

export const AccordionHeader = styled(Box, {
  shouldForwardProp,
})<BenefitsGapProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ gapMedium = '16px' }) => gapMedium};
  width: 100%;
  @media ${({ theme }) => theme.media.medium} {
    flex-direction: row;
    justify-content: space-between;
    gap: 0;
  }
`;
