import styled from "@emotion/styled";
import Link from "next/link";

export const SocialsContainer = styled.div`
display: flex;
/* flex-wrap: wrap; */
`;
export const SocialItemLink = styled(Link)`
  margin-right: 16px;
  color:  ${({ theme }) => theme.colors.white};
  text-decoration: none;
`;
