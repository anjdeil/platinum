import {
  CategoriesWrapperProps,
  LinkWrapperProps,
  ListWrapperProps,
} from "@/types/components/shop/categories/categoriesMenu";
import styled from "@emotion/styled";
import Link from "next/link";

export const Categories = styled.div<CategoriesWrapperProps>`
  position: ${({ shop }) => (shop ? "relative" : "absolute")};
  display: flex;
  top: ${({ shop }) => (shop ? "0" : "190px")};
  z-index: 11;
  bottom: 0;
  transition: transform 0.3s ease-in-out;
  transform: ${({ shop }) => (shop ? "0" : "translateX(-200%)")};
  border-radius: 8px;

  margin-bottom: 15px;
  @media ${({ theme }) => theme.media.large} {
    top: ${({ shop }) => (shop ? "0" : "146px")};
    bottom: 19px;
    border-radius: 0;
  }

  @media ${({ theme }) => theme.media.medium} {
    display: none;
    top: 60px;
    bottom: 0;
  }

  &.active {
    transform: translateX(0%);
  }
`;

export const ListWrapper = styled.div<ListWrapperProps>`
  height: 588px;
  border-radius: ${({ shop }) => (shop ? "8px" : "0")};
  width: 388px;
  padding: ${({ shop }) => (shop ? "16px" : "30px")};
  overflow-y: auto;
  transition: opacity 0.3s ease-in-out;
  background-color: ${({ theme, shop }) =>
    shop ? theme.background.secondary : theme.background.secondary};
  @media ${({ theme }) => theme.media.large} {
    padding: ${({ isSubcategories }) => (isSubcategories ? "16px" : "16px 32px")};
  }
  @media ${({ theme }) => theme.media.middle} {
    width: 350px;
    padding-inline: 20px;
  }
  opacity: ${({ isVisible = true }) => (isVisible ? 1 : 0)};
  display: ${({ isVisible = true }) => (isVisible ? "block" : "none")};
`;
export const ChildListWrapper = styled(ListWrapper)<ListWrapperProps>`
  position: absolute;
  top: 0;
  z-index: 20;
  left: 99.8%;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
`;

export const List = styled.ul`
  margin: 0;
  padding: 0;
  transition: all 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  row-gap: 0;

  @media ${({ theme }) => theme.media.large} {
    row-gap: 8px;
  }

  li {
    list-style: none;
  }
`;

export const LinkWrapper = styled(Link)<LinkWrapperProps>`
  display: block;

  span {
    box-sizing: border-box;
    width: 100%;
    display: inline-flex;
    align-items: center;
    padding: 16px;
    border-radius: 10px;
    color: ${({ theme }) => theme.colors.black};
    font-size: 16px;
    line-height: 24px;
    font-weight: 400;
    text-transform: uppercase;
    transition: all 0.1s ease-in-out;
    background-color: ${({ theme, isactive, isactivehover }) =>
      isactive || isactivehover ? theme.colors.primary : "transparent"};
    color: ${({ theme, isactive, isactivehover }) =>
      isactive || isactivehover ? theme.colors.white : theme.colors.black};

    @media ${({ theme }) => theme.media.large} {
      font-size: 14px;
      padding: 8px 16px;
    }
    & svg {
      margin-right: 10px;
    }
    & path {
      fill: ${({ theme, isactive, isactivehover }) =>
        isactive || isactivehover ? theme.colors.white : theme.colors.black};
    }
    &:hover {
      background-color: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.white};
      & path {
        fill: ${({ theme }) => theme.colors.white};
      }
    }
  }
`;
