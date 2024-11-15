
import styled from "@emotion/styled";


export const CartTableWrapper = styled.div`
width: 100%;
   margin: 24px 0;
   
`;
export const CartTableTable = styled.table`
  box-sizing: border-box;
  width: 100%;
 border-collapse: collapse;
 & tbody{
    & tr{
       
    
    
        border: 1px solid ${({ theme }) => theme.colors.lightBorder} ; 
        border-top: none; 
    }
 }
 
`;
export const CartTableHead = styled.thead`

border: 1px solid ${({ theme }) => theme.background.secondary} ;
border-top-right-radius: 8px;
border-top-left-radius: 8px;
  background: ${({ theme }) => theme.background.secondary} ; 
  & tr{
    border: none;
    height:56px;
    & th{
        padding: 0 16px;
        text-transform: uppercase;
        font:  ${({ theme }) => theme.fonts.bodyMiddleReg} ;
    }
  }
   
   
`;
export const QuantityBlock = styled.div`
  background: ${({ theme }) => theme.background.secondary} ; 
  
  display: flex;
  align-items: center;
   justify-content:  center;
   width: 92px;
   height: 46px;
   border-radius: 8px;

   
`;
export const QuantityWrapper = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-around;

`;

export const CartImgWrapper = styled.div`
     display: inline-block;
  max-width: 60px;
  max-height: 60px;
  width: 100%;
  height: auto;
  aspect-ratio: 1 / 1;
  position: relative; 
   
   
`;
export const CartItemImg = styled.img`
    width: 100%;
   height: 100%;
   object-fit: cover;
   
   
`;
export const CartTableCell = styled.td`
  text-align: center;

`;


