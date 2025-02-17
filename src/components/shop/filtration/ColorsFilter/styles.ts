import styled from '@emotion/styled';

interface color {
  color: string;
}

export const ColorPickIcon = styled.span<color>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10%;
  font-size: 30px;
  width: 50;
  height: 50;
  outline: 1px solid transparent;
  transition: 0.1s ease;
  background: #ff9bac;
  &:hover {
    outline: 1px solid #1a2cd2;
  }
`;

export const ColorPickCheckedIcon = styled(ColorPickIcon)`
  outline: 1px solid #1a2cd2;
`;

export const StyledButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

type StyledButtonProps = {
  color: string;
  selected: boolean;
  isMulticolor?: boolean;
  isTransparent?: boolean;
};

export const StyledButton = styled.button<StyledButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10%;
  font-size: 30px;
  width: 49px;
  height: 31px;
  border: 1px solid #E0EFFE;
  background: ${({ color, isMulticolor, isTransparent }) =>
    isMulticolor
      ? 'linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)'
      : isTransparent
      ? 'linear-gradient(329deg, rgba(255, 255, 255, 1) 47%, rgba(225, 15, 17, 1) 50%, rgba(255, 255, 255, 1) 53%)'
      : color};
  border-radius: 8px
  outline: 2px solid transparent;

  ${({ selected }) =>
    selected &&
    `
    outline: 2px solid #113760;
  `}
`;