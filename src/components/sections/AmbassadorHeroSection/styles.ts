import FallbackImage from "@/components/global/FallbackImage/FallbackImage";
import styled from "@emotion/styled";

export const StyledWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 116px;

  @media ${({ theme }) => theme.media.xl} {
    gap: 80px;
  }

  @media ${({ theme }) => theme.media.middle} {
    gap: 64px;
  }
`;

export const StyledImage = styled(FallbackImage)`
  width: 100%;
  height: auto;
`;

export const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: 16px;
  row-gap: 24px;
`;

export const LeftWrapper = styled.div`
  grid-column: span 6;
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media ${({ theme }) => theme.media.medium} {
    grid-column: 1 / -1;
  }
`;

export const RightWrapper = styled.div`
  grid-column: 9 / -1;
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media ${({ theme }) => theme.media.xl} {
    grid-column: 8 / -1;
  }

  @media ${({ theme }) => theme.media.medium} {
    grid-column: 1 / -1;
  }
`;

export const Divider = styled.div`
  width: 151px;
  height: 2px;
  background-color: ${({ theme }) => theme.colors.border};
`;

export const StyledTitle = styled.h2`
  font: ${({ theme }) => theme.fonts.titleH1SemiBold};
  text-transform: uppercase;

  @media ${({ theme }) => theme.media.large} {
    font: ${({ theme }) => theme.fonts.titleH2SemiBold};
  }
`;

export const TextWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
`;