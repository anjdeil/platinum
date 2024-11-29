import styled from '@emotion/styled';

export const StyledContainer = styled.div`
  width: 100%;
  margin-bottom: 72px;

  @media ${({ theme }) => theme.media.medium} {
    margin-bottom: 64px;
  }
`;
