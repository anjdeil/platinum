import styled from '@emotion/styled';

export const StyledParagraph = styled.p`
  font: ${({ theme }) => theme.fonts.bodyMiddleReg};
`;

export const StyledHeading = styled.h3`
  font: ${({ theme }) => theme.fonts.titleH2Medium};
  text-transform: uppercase;
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
  margin-top: 12px;
  background: none;
  border: none;
  color: #1e71be;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
`;

export const Wrapper = styled.div<{ height: number; expanded: boolean }>`
  height: ${({ height }) => height}px;
  overflow: hidden;
  transition: height 0.4s ease;
  position: relative;
`;

export const Inner = styled.div`
  padding-bottom: 8px;
`;