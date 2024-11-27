import styled from "@emotion/styled";

interface GridRowFullProps {
  padding?: string;
}

export const CartTableWrapper = styled.div`
  width: 100%;
  margin: 24px 0;
`;

export const CartTableGrid = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  width: 100%;
  overflow: hidden;
`;

export const GridHeader = styled.div`
  background: ${({ theme }) => theme.background.secondary};
  font: ${({ theme }) => theme.fonts.bodyMiddleReg};
  text-transform: uppercase;
  border: 1px solid ${({ theme }) => theme.background.secondary};
`;
export const RowWrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.lightBorder};
  border-top: none;
  &:last-of-type {
    border-bottom-right-radius: 8px;
    border-bottom-left-radius: 8px;
  }
`;
export const GridRow = styled.div<GridRowFullProps>`
  display: grid;
  grid-template-columns: 0.3fr 0.6fr 4fr 1fr 2fr 1fr;
  align-items: center;
  padding: ${({ padding = "0" }) => padding};
  & > div {
    padding: 16px;
  }
`;

export const TextCell = styled.div`
  text-align: center;
`;
export const TextNameCell = styled.div`
  text-align: left;
`;

export const TextCellHeader = styled.div`
  background: ${({ theme }) => theme.background.secondary};
  text-align: center;
`;

export const DeleteCell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CartImgWrapper = styled.div`
  display: inline-block;
  max-width: 60px;
  max-height: 60px;
  width: 100%;
  height: 100%;
  aspect-ratio: 1 / 1;
  position: relative;
  @media ${({ theme }) => theme.media.medium} {
    max-width: 140px;
    max-height: 140px;
    margin-right: 16px;
  }
`;
export const CartItemImg = styled.img`
  border-radius: 8px;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: contrast(0.94);
  @media ${({ theme }) => theme.media.medium} {
    border-radius: 8px;
  }
`;

/* Mobile Cart */
export const CartCardAllWrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.background.secondary};
  padding: 16px;
  padding-bottom: 0px;
  margin-bottom: 16px;
  border-radius: 8px;
`;
export const CartCardWrapper = styled.div`
  display: flex;
  align-items: top;
  margin-bottom: 18px;
`;
export const CardContent = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
`;
export const ProductPrice = styled.div`
  align-items: top;
  display: flex;
  justify-content: space-between;
  line-height: 24px;
  & p {
    display: flex;
    align-items: center;
  }
`;
export const ProducTitle = styled.div`
  align-items: top;
  display: flex;
  justify-content: space-between;
  & p {
    padding: 8px 0;
    margin-bottom: 10px;
    line-height: 22px;
  }
`;
export const OnePrice = styled.span`
  font: ${({ theme }) => theme.fonts.bodyMiddleSemiBold};
  color: ${({ theme }) => theme.colors.primary};
`;
