import styled from "@emotion/styled";
import Link from 'next/link';

export const StyledIconContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #fff;
  cursor: pointer;
  box-shadow: 0 0 6px 0 rgba(17, 55, 96, 0.2);
  z-index: 99;

  @media ${({ theme }) => theme.media.medium} {
    width: 55px;
    height: 55px;
  }
`;

export const StyledButtonLink = styled(Link)`
  position: fixed;
  bottom: 40px;
  right: 20px;
  z-index: 100;

  @media ${({ theme }) => theme.media.medium} {
    bottom: 80px;
  }
`;
