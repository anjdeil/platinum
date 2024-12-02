import styled from "@emotion/styled";

export const CategoriesBlockContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  row-gap: 24px;
  width: 100%;
  margin-bottom: 72px;
`;

export const CategoriesList = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;

  @media ${({ theme }) => theme.media.large} {
    gap: 16px;
  }

  @media ${({ theme }) => theme.media.medium} {
    grid-template-columns: repeat(2, 1fr);
  }
`;