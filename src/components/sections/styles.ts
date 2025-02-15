import { Text } from '@/styles/components';
import styled from '@emotion/styled';

interface SectionContainerProps {
  smallGaps?: boolean;
}

export const SectionContainer = styled.section<SectionContainerProps>`
  width: 100%;
  margin-bottom: ${({ smallGaps }) => (smallGaps ? '32px' : '72px')};

  @media ${({ theme }) => theme.media.medium} {
    margin-bottom: ${({ smallGaps }) => (smallGaps ? '32px' : '64px')};
  }
`;

export const RecommendContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  row-gap: 24px;

  @media ${({ theme }) => theme.media.medium} {
    row-gap: 16px;
  }
`;

export const TitleBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const StyledText = styled(Text)`
  text-transform: uppercase;

  @media ${({ theme }) => theme.media.large} {
    font: ${({ theme }) => theme.fonts.bodysmallReg};
  }
`;

export const StyledError = styled.p`
  font: ${({ theme }) => theme.fonts.bodyMiddleReg};
  text-align: center;
  margin-top: 24px;
`;