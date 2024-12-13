import styled from "@emotion/styled";

type hasApplicationForm = {
  columnCount: number;
  hasApplicationForm: boolean;
};

export const StyledContainer = styled.div<hasApplicationForm>`
  display: grid;
  grid-template-columns: repeat(${({ columnCount }) => columnCount}, 1fr);
  gap: ${({ hasApplicationForm }) => (hasApplicationForm ? "96px" : "16px")};

  @media ${({ theme }) => theme.media.largePlus} {
    gap: 16px;
  }

  @media ${({ theme }) => theme.media.medium} {
    grid-template-columns: 1fr;
    justify-items: center;
  }
`;
