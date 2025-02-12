import { AddToBasketButtonStyled } from '@/components/global/buttons/AddToBasketButton/styles';
import styled from '@emotion/styled';

export const ButtonWrap = styled.div`
  margin-top: 15px;
  display: flex;
  gap: 20px;
`;

export const ApplyButton = styled(AddToBasketButtonStyled)`
  padding: 5px 10px;

  &:disabled {
    background-color: ${({ theme }) => theme.background.grey};
    color: ${({ theme }) => theme.colors.primary};
    cursor: default;
    opacity: 0.6;
    border: none;
  }
`;

export const ResetButton = styled(AddToBasketButtonStyled)`
  padding: 5px 10px;
  background-color: ${({ theme }) => theme.background.resetButton};
  border-color: ${({ theme }) => theme.background.resetButton};
  color: ${({ theme }) => theme.colors.black};

  &:hover {
    color: ${({ theme }) => theme.colors.black};
    background-color: ${({ theme }) => theme.background.resetButtonHover};
    border-color: ${({ theme }) => theme.background.resetButtonHover};
  }

  &:active {
    background-color: ${({ theme }) => theme.background.resetButtonActive};
    border-color: ${({ theme }) => theme.background.resetButtonActive};
  }
`;
