import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 100px;

  @media ${({ theme }) => theme.media.large} {
    margin-bottom: 80px;
  }

  @media ${({ theme }) => theme.media.medium} {
    margin-bottom: 40px;
  }
`;

export const StyledParagraph = styled.p`
  font: ${({ theme }) => theme.fonts.bodyMiddleReg};

  @media ${({ theme }) => theme.media.large} {
    font: ${({ theme }) => theme.fonts.bodypresmallReg}; 
  }
`;

export const StyledHeadingH2 = styled.h2`
  font: ${({ theme }) => theme.fonts.titleH2Medium};
  text-transform: uppercase;  
  margin-bottom: 24px;
  margin-top: 32px;

  @media ${({ theme }) => theme.media.large} {
    font: ${({ theme }) => theme.fonts.bodyMiddleSemiBold}; 
  }
`;

export const StyledHeadingH3 = styled.h3`
  font: ${({ theme }) => theme.fonts.titleH2Medium};
  text-transform: uppercase;
  margin-bottom: 24px;
  margin-top: 32px;

  @media ${({ theme }) => theme.media.large} {
    font: ${({ theme }) => theme.fonts.bodyMiddleSemiBold}; 
  }
`;

export const StyledOrderedList = styled.ol`
  list-style-type: decimal;
  margin-left: 20px;
`;

export const StyledList = styled.ol`
  list-style-type: none;
  margin-left: 20px;
`;

export const StyledListItem = styled.li`
  margin-bottom: 8px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const ToggleButton = styled.button`
  margin-top: 16px;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.border};
  cursor: pointer;
  font: ${({ theme }) => theme.fonts.bodyMiddleReg};
  align-self: flex-end;
  transition: all 0.2s ease;

  @media ${({ theme }) => theme.media.large} {
    font: ${({ theme }) => theme.fonts.bodypresmallReg}; 
  }

  &:hover {
    color: ${({ theme }) => theme.colors.active};
  }
`;

export const Wrapper = styled.div<{ height: number; expanded: boolean }>`
  height: ${({ height }) => height}px;
  overflow: hidden;
  transition: height 0.4s ease;
  position: relative;
`;

export const Inner = styled.div`
  padding-bottom: 8px;

  & > :first-child {
    margin-top: 0;
  }
  
`;

export const GradientFade = styled.div<{ expanded: boolean }>`
  display: ${({ expanded }) => (expanded ? 'none' : 'block')};
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40px;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0), #fff);
  pointer-events: none;
`;

export const StyledBlockquote = styled.blockquote`
  font: ${({ theme }) => theme.fonts.bodyMiddleReg};
  border-left: 2px solid ${({ theme }) => theme.colors.primary};
  padding-left: 16px;
`;