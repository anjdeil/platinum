import styled from '@emotion/styled';

export const StyledContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: stretch;
  margin-top: 24px;
  gap: 16px;

  @media ${({ theme }) => theme.media.medium} {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;
