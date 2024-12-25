import styled from "@emotion/styled";

interface InnerSectionProps {
  isNarrow?: boolean;
}

export const StyledInnerSection = styled.div<InnerSectionProps>`
  width: 100%;
  max-width: ${({ isNarrow }) => (isNarrow ? '800px' : '100%')};
  @media ${({ theme }) => theme.media.largePlus} {
    display: flex;
    flex-direction: column;
    gap: '16px';
  }

  @media ${({ theme }) => theme.media.medium} {
    align-items: flex-start;
    justify-content: flex-start;
  }
`;
