import FallbackImage from "@/components/global/FallbackImage/FallbackImage";
import styled from "@emotion/styled";

export const StyledWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 40px;

  @media ${({ theme }) => theme.media.large} {
    row-gap: 32px;
  }
`;

export const StyledTitle = styled.h2`
  text-transform: uppercase;
  text-align: center;
  font: ${({ theme }) => theme.fonts.titleH2SemiBold};
  max-width: 632px;
  margin: 0 auto;

  @media ${({ theme }) => theme.media.large} {
    font: ${({ theme }) => theme.fonts.bodyMiddleSemiBold};
  }
`;

export const StyledList = styled.ul`
  width: 100%;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: 16px;
  row-gap: 16px;

  @media ${({ theme }) => theme.media.medium} {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const StyledImage = styled(FallbackImage)`
  width: 40px;
  height: 40px;
`;

export const StyledItem = styled.li`
  grid-column: span 4;
  padding: 24px;
  background-color: ${({ theme }) => theme.background.secondary};
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  row-gap: 24px;
  align-items: center;

  @media ${({ theme }) => theme.media.large} {
    grid-column: span 6;
  }

  @media ${({ theme }) => theme.media.medium} {
    grid-column: 1 / -1;
  }
`;

export const StyledText = styled.span`
  font: ${({ theme }) => theme.fonts.bodyMiddleReg};
  text-align: center;

  @media ${({ theme }) => theme.media.large} {
    font-size: 14px;
    line-height: 22px;
  }
  
`;
