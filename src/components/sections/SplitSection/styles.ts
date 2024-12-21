import styled from "@emotion/styled";

type hasApplicationForm = {
  columnCount: number;
  hasApplicationForm: boolean;
};

export const StyledContainer = styled.div<hasApplicationForm>`
  display: grid;
  grid-template-columns: repeat(${({ columnCount }) => columnCount}, 1fr);
  gap: ${({ hasApplicationForm }) => (hasApplicationForm ? '96px' : '16px')};
  align-items: center;
  align-items: ${({ hasApplicationForm }) =>
    hasApplicationForm ? 'center' : 'flex-start'};

  @media ${({ theme }) => theme.media.largePlus} {
    gap: 16px;
  }

  @media ${({ theme }) => theme.media.middle} {
    grid-template-columns: ${({ hasApplicationForm }) =>
      hasApplicationForm
        ? '1fr'
        : 'repeat(${({ columnCount }) => columnCount}, 1fr)'};
    justify-items: ${({ hasApplicationForm }) =>
      hasApplicationForm ? 'center' : 'initial'};

    gap: 24px;
  }

  @media ${({ theme }) => theme.media.medium} {
    grid-template-columns: 1fr;
    justify-items: flex-start;
  }
`;
