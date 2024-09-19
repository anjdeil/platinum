import styled from "@emotion/styled";
import Link from "next/link";

export const Categories = styled.div`
  position: absolute;
  display: none;
  top: 60px;
  z-index: 11;
  bottom: 0;
  transition: transform 0.3s ease-in-out;
  transform: translateX(-105%);
  background-color: ${({ theme }) => theme.background.secondary};

  @media ${({ theme }) => theme.media.medium} {
    display: flex;
    top: 136px;
    bottom: 19px;
    border-radius: 0 0 8px 0;
  }

  @media ${({ theme }) => theme.media.large} {
    top: 179px;
    bottom: 44px;
  }

  &.active {
    transform: translateX(0%);
  }
`;

export const ListWrapper = styled.div`
  width: auto;
  min-width: 272px;
  padding: 16px 32px;
  overflow-y: auto;
  transition: opacity 0.3s ease-in-out;
  
  @media ${({ theme }) => theme.media.large} {
    min-width: 388px;
    padding-left: 80px;
    padding-right: 16px;
  }

  &.visible {
    opacity: 1;
    display: block;
  }

  &.hidden {
    opacity: 0;
    display: none;
  }

  &.subcategories {
    padding: 16px;

     @media ${({ theme }) => theme.media.large} {
      padding: 16px 32px;
    }
  }
`;

export const List = styled.ul`
  margin: 0;
  padding: 0;
  transition: all 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  row-gap: 8px;

  @media ${({ theme }) => theme.media.large} {
    row-gap: 0;
  }

  li {
    list-style: none;
  }
`;

export const LinkWrapper = styled(Link)`
  display: block;

  span {
    box-sizing: border-box;
    width: 100%;
    display: inline-flex;
    padding: 8px 16px;
    border-radius: 10px;
    color: ${({ theme }) => theme.colors.black};
    font-size: 14px;
    line-height: 24px;
    font-weight: 400;
    text-transform: uppercase;
    transition: all 0.1s ease-in-out;

    @media ${({ theme }) => theme.media.large} {
      font-size: 16px;
      padding: 16px;
    }

    &:hover {
      background-color: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.white};
    }
  }
`;