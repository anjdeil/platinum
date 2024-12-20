import styled from "@emotion/styled";

export const StyledInnerSection = styled.div`
  width: 100%;
  @media ${({ theme }) => theme.media.largePlus} {
    display: flex;
    flex-direction: column;
    gap: '16px';
  }

  @media ${({ theme }) => theme.media.medium} {
    align-items: flex-start;
    justify-content: flex-start;
  }
`;
