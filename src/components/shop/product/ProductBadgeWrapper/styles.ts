import styled from "@emotion/styled";

export const BadgeWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  align-items: start;
  position: absolute;
  padding: 16px;
  top: 0;
  z-index: 10;
`;

export const ProductBadgeBox = styled.div`
  max-width: 80%;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;
