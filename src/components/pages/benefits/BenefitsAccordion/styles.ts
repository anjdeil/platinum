import { Title } from '@/styles/components';
import {
  BenefitsGapProps,
  Level,
} from '@/types/components/pages/benefits/benefitsAccordion';
import styled from '@emotion/styled';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
} from '@mui/material';

const shouldForwardProp = (prop: string) =>
  !['gapMedium', 'gapSm', 'gapLg'].includes(prop);

export const BenefitsLayout = styled(Box, {
  shouldForwardProp,
})<BenefitsGapProps>`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ gapMedium = '16px' }) => gapMedium};
  margin-bottom: 80px;
  @media ${({ theme }) => theme.media.large} {
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

  @media ${({ theme }) => theme.media.large} {
    :nth-of-type(1) {
      width: 74%;
    }
    :nth-of-type(2) {
      width: 87%;
    }
    :nth-of-type(3) {
      width: 100%;
    }
    gap: ${({ gapSm = '8px' }) => gapSm};
  }
  @media ${({ theme }) => theme.media.medium} {
    :nth-of-type(1),
    :nth-of-type(2),
    :nth-of-type(3) {
      width: 100%;
    }
  }
`;

export const BenefitsTitle = styled(Title)`
  font: ${({ theme }) => theme.fonts.titleH1SemiBold};
  text-transform: uppercase;
  @media ${({ theme }) => theme.media.medium} {
    font: ${({ theme }) => theme.fonts.bodyMiddleSemiBold};
  }
`;

export const BenefitsAccordionDetails = styled(AccordionDetails)`
  &.silver {
    min-height: 200px;

    @media (max-width: 1024px) {
      min-height: unset;
    }
  }
  &.gold {
    min-height: 450px;

    @media (max-width: 1024px) {
      min-height: unset;
    }
  }
  &.platinum {
    min-height: 550px;

    @media (max-width: 1024px) {
      min-height: unset;
    }
  }
  margin-top: ${({ theme }) => theme.spacing.medium};
`;

export const BenefitsPrice = styled.span`
  font: ${({ theme }) => theme.fonts.titleH2Medium};
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
  @media ${({ theme }) => theme.media.large} {
    .MuiAccordionSummary-expandIconWrapper {
      display: none;
    }
    padding: 16px 32px;
  }
`;

export const CustomAccordionSummary = styled(AccordionSummary)`
  margin: 0;
  padding: 0;
  @media ${({ theme }) => theme.media.large} {
    margin-bottom: 10px;
    .MuiAccordionSummary-content {
      margin: 0;
      justify-content: center;
    }
  }
`;

export const StyledListItem = styled.li`
  font: ${({ theme }) => theme.fonts.bodyMiddleReg};
  display: flex;
  align-items: center;
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

  @media (max-width: 768px) {
    flex-direction: row-reverse;
    justify-content: space-between;
    gap: 0;
  }
  span {
    @media (max-width: 768px) {
      font-size: 1rem;
      font-weight: 600;
    }
  }
`;
