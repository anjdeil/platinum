import styled from "@emotion/styled";

export const CategoriesBlockContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  row-gap: 24px;
  width: 100%;
`;

export const CategoriesList = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  aspect-ratio: 1.65;

  @media ${({ theme }) => theme.media.large} {
    gap: 16px;
  }

  @media ${({ theme }) => theme.media.medium} {
    grid-template-columns: repeat(2, 1fr);
    aspect-ratio: 0.35;
  }

  @media ${({ theme }) => theme.media.small} {
    aspect-ratio: 0.3;
  }
`;