import styled from "@emotion/styled";
import Link from "next/link";

export const BreadcrumbsWrapper = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const BreadcrumbsList = styled.ol`
  display: flex;
  list-style: none;
  row-gap: 8px;
  flex-wrap: wrap;
  padding: 0;
  margin: 0;

  @media ${({ theme }) => theme.media.medium} {
    justify-content: center;
  }
`;

export const BreadcrumbLinkWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-right: 16px;
`;

export const BreadcrumbLink = styled(Link)`
  color: ${({ theme }) => theme.colors.black};
  text-decoration: none;
  transition: opacity 0.2s ease;
  text-transform: uppercase;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;

export const BreadcrumbText = styled.span`
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.black};
`;
