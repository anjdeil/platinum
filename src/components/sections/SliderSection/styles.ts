import styled from '@emotion/styled';

export const StyledContainer = styled.div`
  width: 100%;
  margin-bottom: 80px;

  @media ${({ theme }) => theme.media.medium} {
    margin-bottom: 64px;
  }
`;
