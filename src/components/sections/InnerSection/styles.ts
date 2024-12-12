import styled from "@emotion/styled";

export const StyledInnerSection = styled.div`
  padding: 16px;
  border-radius: 8px;

  @media ${({ theme }) => theme.media.largePlus} {
    display: flex;
    flex-direction: column;
    gap: "16px";
  }

  @media ${({ theme }) => theme.media.medium} {
    width: 300px;
  }
`;
