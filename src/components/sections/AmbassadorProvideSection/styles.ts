import styled from "@emotion/styled";

export const StyledContainer = styled.section`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primaryBlue700};
`;

export const StyledWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: 16px;
  row-gap: 40px;
  padding-block: 56px;

  @media ${({ theme }) => theme.media.large} {
    padding-block: 32px;
  }

  @media ${({ theme }) => theme.media.medium} {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const StyledTitle = styled.h2`
  grid-column: span 5;
  text-transform: uppercase;
  font: ${({ theme }) => theme.fonts.titleH1SemiBold};
  color: ${({ theme }) => theme.colors.white};

  @media ${({ theme }) => theme.media.large} {
    font: ${({ theme }) => theme.fonts.titleH2SemiBold};
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
  flex-direction: column;
  row-gap: 32px;
  counter-reset: item;

  @media ${({ theme }) => theme.media.large} {
    grid-column: 6 / -1;
  }

  @media ${({ theme }) => theme.media.medium} {
    grid-column: 1 / -1;
  }
`;

export const StyledItem = styled.li`  
  padding-bottom: 32px;
  border-bottom: 1px solid rgba(255,255,255, 0.27);  
  counter-increment: item;  
`;

export const StyledText = styled.span`
  font: ${({ theme }) => theme.fonts.titleH2Medium};
  padding-left: 16%;  
  position: relative;
  display: inline-block;

  @media ${({ theme }) => theme.media.large} {
    font-size: 14px;
    line-height: 22px;
    font-weight: 600;
    padding-left: 38px;
  }
  
  &::before {
    content: counter(item);
    position: absolute;
    left: 0;
    top: 50%;
    transform: translate(0, -50%);
    font-size: 22px;
    line-height: 32px;
    font-weight: 500;
  }
`;
