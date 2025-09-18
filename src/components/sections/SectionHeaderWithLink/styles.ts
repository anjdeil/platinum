import styled from "@emotion/styled";
import Link from "next/link";

export const StyledWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  & > div {
    align-items: flex-start;
  }
`;

export const StyledLink = styled(Link)`
  text-decoration: underline;
  transition: opacity 0.2s ease;
  text-align: center;
  color: ${({ theme }) => theme.colors.secondary};
  font: ${({ theme }) => theme.fonts.bodyMiddleReg};
  word-break: break-word;

  @media ${({ theme }) => theme.media.large} {
    font-size: 14px;
    font-weight: 400;
  }

  &:hover {
    opacity: 0.7;
  }
`;
