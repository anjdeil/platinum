import { PopupContainerProps } from "@/types/components/global/popups/mobilePopup";
import styled from "@emotion/styled";

export const Overlay = styled.div`
  position: fixed;
  z-index: 100;
  inset: 0;
`;

export const PopupContainer = styled.div<PopupContainerProps>`
  display: none;

  @media ${({ theme }) => theme.media.large} {
    position: fixed;
    background-color: ${({ theme, backgroundColor = theme.background.secondary }) =>
    backgroundColor};
    width: ${({ width = "70%" }) => width};
    padding-top: ${({ paddingTop = "0" }) => paddingTop};
    top: ${({ scroll = 0 }) => (scroll ? Math.max(0, 146 - scroll) : 146)}px;
    left: 0;
    bottom: 0;
    display: grid;
    z-index: 100;
  }

  @media ${({ theme }) => theme.media.large} {
    bottom: 80px;
    grid-template-rows: ${({ title }) => (title === "" ? "1fr" : "90px 1fr")};
    overflow: auto;
  }

  @media ${({ theme }) => theme.media.medium} {
    top: ${({ scroll = 0 }) => (scroll ? Math.max(0, 60 - scroll) : 60)}px;
    bottom: 60px;
  }
`;

export const Header = styled.div<PopupContainerProps>`
  display: none;
  padding: ${({ padding }) => (padding === "all" ? "0 35px" : " 0 17px")};

  @media ${({ theme }) => theme.media.middle} {
    display: block;
  }
`;

export const Content = styled.div<PopupContainerProps>`
  padding: ${({ padding }) => (padding === "all" ? "0 35px" : "0 20px 0 0")};
  height: auto;
  overflow: auto;
  position: relative;
`;
