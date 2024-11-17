import styled from '@emotion/styled';

export const WarningWrapper = styled.div`
  background: ${({ theme }) => theme.background.secondary};
  border: 1px solid ${({ theme }) => theme.colors.lightBorder};
  border-top: none;
  padding: 10px 15px;
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 20px;
  & div {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  @media ${({ theme }) => theme.media.medium} {
    border: none;
    border-radius: 8px;
    margin-bottom: 16px;
    justify-content: center;
  }
`;

export const UpdateButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  transition: all 0.3s;

  &:hover {
    border: 1px solid ${({ theme }) => theme.background.secondary};
    color: ${({ theme }) => theme.colors.black};
    background-color: ${({ theme }) => theme.colors.white};
  }
`;
