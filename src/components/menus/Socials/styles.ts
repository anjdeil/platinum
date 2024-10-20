import { SocialItemLinkProps, SocialsContainerProps } from "@/types/menus/socials";
import styled from "@emotion/styled";
import Link from "next/link";

export const SocialsContainer = styled.div<SocialsContainerProps>`
  display: flex;
  margin: ${({ margin = "0 0 0 0" }) => margin};
`;
export const SocialItemLink = styled(Link) <SocialItemLinkProps>`
  display: flex;
  align-items: center;
  :not(:last-child){
    margin-right: ${({ itemmargin = "16px" }) => itemmargin};
  }
  text-decoration: none;
`;
export const SocialText = styled.span`
  text-transform: uppercase;
  margin-left: 8px;
  color:  ${({ theme }) => theme.colors.white};
  
`;
