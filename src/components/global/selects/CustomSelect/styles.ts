import { CustomSelectStyledProps } from "@/types/components/global/selects";
import styled from "@emotion/styled";
import { Collapse } from "@mui/material";

export const CustomSelectStyled = styled.div<CustomSelectStyledProps>`
  box-sizing: border-box;
  position: relative;
  border-radius: ${({ isOpen, borderRadius = "0" }) =>
    isOpen ? `${borderRadius} ${borderRadius} 0 0` : borderRadius};
  color: ${({ theme, color = theme.colors.black }) => color};
  background: ${({ background = "transparent" }) => background};
  width: ${({ width = "auto" }) => width};
  min-width: fit-content;
  display: flex;
  gap: 8px;
  align-items: center;
  padding: ${({ padding = "4px" }) => padding};
  font: ${({ theme }) => theme.fonts.bodyMiddleReg};
  font-size: ${({ fontSize }) => fontSize};
  font: ${({ theme }) => theme.fonts.bodyMiddleReg};
  font-size: ${({ fontSize }) => fontSize};
  cursor: pointer;
  text-transform: uppercase;

  @media ${({ theme }) => theme.media.large} {
    padding: ${({ tabletPadding = "4px" }) => tabletPadding};
    line-height: 1.375em;
  }

  @media ${({ theme }) => theme.media.medium} {
    font-size: ${({ mobFontSize = "14px" }) => mobFontSize};
    padding: ${({ mobPadding = "4px" }) => mobPadding};
  }
`;

export const StyledCollapse = styled(Collapse)<CustomSelectStyledProps>`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  min-width: fit-content;
  z-index: 10000;
  border-radius: ${({ isOpen, borderRadius = "0" }) =>
    isOpen ? `0 0 ${borderRadius} ${borderRadius}` : borderRadius};

  & .MuiCollapse-wrapperInner {
    border-radius: 6px;
    overflow: hidden;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 10px 10px 10px;
  }
`;

export const MenuItem = styled.div<CustomSelectStyledProps>`
  display: flex;
  justify-content: center;
  justify-content: ${({ alignItem = "center" }) => alignItem};
  align-items: center;
  text-align: center;
  font: ${({ theme }) => theme.fonts.bodyMiddleReg};
  font-size: ${({ fontSize }) => fontSize};
  padding: ${({ padding = "4px" }) => padding};
  color: ${({ theme, color = theme.colors.black }) => color};
  padding-inline: ${({ paddingOptions = "4px" }) => paddingOptions};
  background: ${({ theme, background = theme.colors.white }) => background};
  cursor: pointer;

  @media ${({ theme }) => theme.media.large} {
    padding: ${({ tabletPadding = "4px" }) => tabletPadding};
    line-height: 1.375em;
  }

  @media ${({ theme }) => theme.media.medium} {
    font-size: ${({ mobFontSize = "14px" }) => mobFontSize};
    padding: ${({ mobPadding = "4px" }) => mobPadding};
  }

  &:hover {
    background: ${({ theme, background }) =>
      background ? theme.colors.white : theme.background.secondary};
  }
`;
