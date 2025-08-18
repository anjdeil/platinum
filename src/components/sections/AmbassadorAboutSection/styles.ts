import FallbackImage from "@/components/global/FallbackImage/FallbackImage";
import styled from "@emotion/styled";

export const StyledWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: 16px;
  row-gap: 40px;

  @media ${({ theme }) => theme.media.large} {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const LeftBlock = styled.div`
  grid-column: span 6;
  display: flex;
  flex-direction: column;
  row-gap: 53px;

  @media ${({ theme }) => theme.media.large} {
    grid-column: 1 / -1;
  }
`;

export const RightBlock = styled.div`
  grid-column: 8 / -1;
  display: flex;
  flex-direction: column;
  row-gap: 32px;

  @media ${({ theme }) => theme.media.large} {
    grid-column: 1 / -1;
  }

  & h3 {
    text-transform: none;

    @media ${({ theme }) => theme.media.large} {
      font-size: 14px;
      line-height: 22px;
      font-weight: 400;
    }

    &:last-of-type {
      margin: 0;
    }
  }

  & br {
    display: none;
  }
`;

export const StyledTitle = styled.h2`
  width: 100%;
  max-width: 577px;
  text-transform: uppercase;
  font: ${({ theme }) => theme.fonts.titleH1SemiBold};
  hyphens: auto;

  @media ${({ theme }) => theme.media.large} {
    font: ${({ theme }) => theme.fonts.titleH2SemiBold};
    max-width: unset;
  }

  @media ${({ theme }) => theme.media.medium} {
    grid-column: 1 / -1;
  } 
`;

export const StyledList = styled.ul`
  grid-column: 7 / -1;
  list-style: none;
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  column-gap: 24px;
  row-gap: 16px;

  @media ${({ theme }) => theme.media.large} {
    grid-column: 6 / -1;
  }

  @media ${({ theme }) => theme.media.medium} {
    grid-column: 1 / -1;
    flex-direction: column;
  }
`;

export const IconsBlock = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const StyledIcon = styled(FallbackImage)`
  width: 24px;
  height: 24px;
`;

export const StyledItem = styled.li`
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 13px;

  @media ${({ theme }) => theme.media.large} {
    align-items: center;
  }

  @media ${({ theme }) => theme.media.medium} {
    grid-column: 1 / -1;
  }
`;

export const StyledLink = styled.a`
  font: ${({ theme }) => theme.fonts.bodyMiddleReg};
  text-decoration: none;
  color: ${({ theme }) => theme.colors.black};
  white-space: nowrap;

  @media ${({ theme }) => theme.media.large} {
    text-align: center;
  }  
`;

export const StyledButtonLink = styled.a`
  box-sizing: border-box;
  width: fit-content;
  padding: 16px 60px;
  border-radius: 10px;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.primary};
  font: ${({ theme }) => theme.fonts.bodyMiddleReg};
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;

  &:hover {
    background-color: ${({ theme }) => theme.background.main};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  @media ${({ theme }) => theme.media.large} {
    width: 100%;
    padding: 15px;
  }
`;