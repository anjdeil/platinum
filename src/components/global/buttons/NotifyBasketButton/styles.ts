import styled from '@emotion/styled';

type NotifyBasketButtonProps = {
  height?: string;
};
export const NotifyBasketButtonStyled = styled.button<NotifyBasketButtonProps>`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};
  font: ${({ theme }) => theme.fonts.bodyMiddleReg};
  padding: 16px;
  text-align: center;
  border-radius: 10px;
  cursor: pointer;
  border: ${({ theme }) => `1px solid  ${theme.colors.border}`};
  transition: all 0.2s ease;

  @media (hover: hover) {
    &:hover {
      background-color: ${({ theme }) => theme.background.hover};
      color: ${({ theme }) => theme.colors.white};
      border: 1px solid transparent;
    }

    &:active {
      background-color: ${({ theme }) => theme.colors.primary};
    }
  }

  @media (hover: none) {
    &:active {
      background-color: ${({ theme }) => theme.background.hover};
      color: ${({ theme }) => theme.colors.white};
    }
  }

  @media ${({ theme }) => theme.media.large} {
    padding: 12px;
  }

  @media screen and (max-width: 848px) {
    // height: ${({ height }) => (height === '56px' ? '48px' : height)};
    padding: 12px 6px;
    font-size: 14px;
  }

  @media ${({ theme }) => theme.media.medium} {
    padding: 10px 16px;
    font-size: 14px;
    line-height: 1.5em;
  }

  @media ${({ theme }) => theme.media.smallest} {
    height: 56px;
    font-size: 14px;
    line-height: 1.2em;
    padding: 0 16px;
    overflow: hidden;
  }

  &:disabled {
    color: ${({ theme }) => theme.colors.grey};
    background-color: transparent;
    border: none;
  }
`;
