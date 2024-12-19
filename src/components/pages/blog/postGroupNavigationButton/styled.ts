import styled from '@emotion/styled';
import Link from 'next/link';

type StyledButtonsGroupProps = {
  isOnlyNextButton: boolean;
};

export const StyledButtonsGroup = styled.div<StyledButtonsGroupProps>`
  width: 100%;
  display: flex;
  justify-content: ${({ isOnlyNextButton }) =>
    isOnlyNextButton ? 'flex-end' : 'space-between'};

  @media ${({ theme }) => theme.media.large} {
    padding: 0;
  }

  @media ${({ theme }) => theme.media.medium} {
    margin-bottom: 64px;
  }
`;

export const StyledButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 110px;
  height: 48px;
  border-radius: 8px;
  font: ${({ theme }) => theme.fonts.bodypresmallReg};
  text-decoration: none;
  color: ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.background.secondary};
  gap: 8px;
  padding: 12px 16px 12px 16px;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.grey};

    svg {
      color: ${({ theme }) => theme.colors.grey};
    }
  }
`;

export const StyledIcon = styled.svg`
  color: ${({ theme }) => theme.colors.primary};
`;
