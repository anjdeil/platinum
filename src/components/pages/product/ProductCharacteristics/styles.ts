import styled from "@emotion/styled";

export const ProductCharacteristicsContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export const ProductCharacteristicsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CharacteristicsTableCell = styled.div`
  padding: 12px 16px;
`;

export const CharacteristicsTableRow = styled(CharacteristicsTableCell)`
  text-transform: uppercase;
  background-color: ${({ theme }) => theme.background.secondary};
`;

