import styled from '@emotion/styled';

export const FormContainer = styled.div`
  padding: 24px 0;
  min-height: 75.1vh;

  @media ${({ theme }) => theme.media.large} {
    min-height: 80vh;
  }
`;
