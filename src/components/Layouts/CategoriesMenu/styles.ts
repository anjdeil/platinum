import styled from "@emotion/styled";
import Link from "next/link";

export const Categories = styled.div`
  position: absolute;
  display: flex;
  top: 189px;  
  z-index: 11;
  bottom: 0;
  
  transition: transform 0.3s ease-in-out;
  transform: translateX(-105%);
  background-color: ${({ theme }) => theme.background.secondary};
  border-radius: 0 0 8px 0;

  @media ${({ theme }) => theme.media.large} {
    top: 136px;
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

export const ListWrapper = styled.div`
  width: auto;
  min-width: 388px;
  padding-left: 80px;
  padding-right: 16px;  
  overflow-y: auto;
  transition: opacity 0.3s ease-in-out;
  
  @media ${({ theme }) => theme.media.large} {
    min-width: 272px;
    padding: 16px 32px;
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
    padding: 16px 32px;    

    @media ${({ theme }) => theme.media.large} {
      padding: 16px;
    }
  }
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

export const LinkWrapper = styled(Link)`
  display: block;

  span {
    box-sizing: border-box;
    width: 100%;
    display: inline-flex;
    padding: 16px;    
    border-radius: 10px;
    color: ${({ theme }) => theme.colors.black};
    font-size: 16px;
    line-height: 24px;
    font-weight: 400;
    text-transform: uppercase;
    transition: all 0.1s ease-in-out;

    @media ${({ theme }) => theme.media.large} {
      font-size: 14px;
      padding: 8px 16px;
    }

    &:hover {
      background-color: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.white};
    }
  }
`;