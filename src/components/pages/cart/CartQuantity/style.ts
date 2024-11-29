import styled from "@emotion/styled";

export const QuantityBlock = styled.input`
  background: ${({ theme }) => theme.background.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 92px;
  height: 46px;
  border-radius: 8px;
  margin: 0 8px;
  outline: none;
  border: none;
  text-align: center;
 /*  @media ${({ theme }) => theme.media.medium} {
    width: 60px;
  } */
`;
export const QuantityWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  @media ${({ theme }) => theme.media.medium} {
    margin: 16px 0; 
  }
`;

export const QuantityBtn = styled.button`
  display: block;
  padding: 10px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    scale: 1.2;
  }
`;
