import styled from '@emotion/styled';

export const TitleContainer = styled.div`
  width: 100%;
  height: auto;
  max-width: 846px;
  margin: 0 auto;
  text-align: center;

  @media ${({ theme }) => theme.media.large} {
    max-width: 640px;
  }
`;
