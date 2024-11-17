import styled from "@emotion/styled";

export const CartTableWrapper = styled.div`
  width: 100%;
  margin: 24px 0;
`;

export const CartTableTable = styled.table`
  box-sizing: border-box;
  width: 100%;
  border-collapse: collapse;
  & tbody {
    & tr {
      border: 1px solid ${({ theme }) => theme.colors.lightBorder};
      border-top: none;
      & td {
        padding: 5px 16px;
      }
    }
  }
  @media ${({ theme }) => theme.media.medium} {
    font: ${({ theme }) => theme.fonts.bodypresmallReg};
  }
`;
export const CartTableHead = styled.thead`
  border: 1px solid ${({ theme }) => theme.background.secondary};
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
  background: ${({ theme }) => theme.background.secondary};
  & tr {
    border: none;
    height: 56px;
    & th {
      padding: 0 16px;
      text-transform: uppercase;
      font: ${({ theme }) => theme.fonts.bodyMiddleReg};
      @media ${({ theme }) => theme.media.medium} {
        font: ${({ theme }) => theme.fonts.bodypresmallReg};
      }
    }
  }
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
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter:  contrast(0.94);
  @media ${({ theme }) => theme.media.medium} {
   /*  box-shadow: 0px 0px 39px -10px rgba(34, 60, 80, 0.2); */
    border-radius: 8px;
  }
`;
export const CartTableCell = styled.td`
  text-align: center;
`;
export const DeleteCell = styled.td`
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
`;

/* cartCard */

export const CartCardWrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.background.secondary};
  padding: 16px;
  display: flex;
  align-items: top;

  margin-bottom: 16px;
  border-radius: 8px;
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
  & p{
    display:flex;
    align-items: center;
  }
  /* &:not(:last-child) {
    margin-bottom: 30px;
  } */
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
