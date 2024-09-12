import transformCategoriesMenu from "@/services/transformers/transformCategoriesMenu";
import { useAppDispatch, useAppSelector } from "@/store";
import { useGetCategoriesQuery } from "@/store/rtk-queries/wpCustomApi";
import MenuCategoriesSlice from "@/store/slices/MenuCategoriesSlice";
import Link from "next/link";
import { useCallback } from "react";
import styled from 'styled-components';

const Categories = styled.div`
  position: absolute;
  display: none;
  top: 60px;
  z-index: 11;
  bottom: 0;
  transition: transform 0.3s ease-in-out;
  transform: translateX(-105%);
  background-color: ${({ theme }) => theme.background.secondary};

  @media (min-width: 768px) {
    display: flex;
    top: 136px;
    bottom: 19px;
    border-radius: 0 0 8px 0;
  }

  @media (min-width: 1024px) {
    top: 179px;
    bottom: 44px;
  }

  &.active {
    transform: translateX(0%);
  }
`;

const ListWrapper = styled.div`
  width: auto;
  min-width: 272px;
  padding: 16px 32px;
  overflow-y: auto;
  transition: opacity 0.3s ease-in-out;
  
  @media (min-width: 1024px) {
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

     @media (min-width: 1024px) {
      padding: 16px 32px;
    }
  }
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  transition: all 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  row-gap: 8px;

  @media (min-width: 1024px) {
    row-gap: 0;
  }

  li {
    list-style: none;
  }
`;

const LinkWrapper = styled(Link)`
  display: block;

  span {
    width: 100%;
    display: inline-flex;
    padding: 8px 16px;
    border-radius: 10px;
    color: ${({ theme }) => theme.colors.black};
    font-size: 14px;
    line-height: 24px;
    text-transform: uppercase;
    transition: all 0.1s ease-in-out;

    @media (min-width: 1024px) {
      font-size: 16px;
      padding: 16px;
    }

    &:hover {
      background-color: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.white};
    }
  }
`;

export const CategoriesMenu = () => {
    const dispatch = useAppDispatch();
    const { isOpen, isCategoryActive } = useAppSelector(state => state.MenuCategoriesSlice);
    const popup = useAppSelector(state => state.Popup);
    const { setMenuOpen, setCategory } = MenuCategoriesSlice.actions;
    const { data: categoriesData = [] } = useGetCategoriesQuery({});
    const categories = categoriesData?.data ? transformCategoriesMenu(categoriesData.data) : [];

    const onLinkClick = useCallback(() => {
        if (isOpen) {
            dispatch(setMenuOpen(false));
            dispatch(setCategory(null));
        }
    }, [isOpen, dispatch, setMenuOpen, setCategory]);
  
    if (!categories || categories.length === 0) {
      return null;
    }
  
    const activeCategory = isCategoryActive ? categories.find(category => category.id === isCategoryActive) : null;
    const hasSubcategories = activeCategory?.subcategories && activeCategory.subcategories.length > 0;

    return (
        <Categories className={popup === "categories-menu" ? "active close-outside" : undefined}>
            <ListWrapper>
                <List>
                    {categories.map((category) => (
                        <li key={category.id}>
                            <LinkWrapper href={category.url} className={isCategoryActive === category.id ? "active link desc" : "link desc"} 
                                onMouseEnter={() => dispatch(setCategory(category.id))}
                                onClick={onLinkClick}
                            >
                                <span>{category.categoryName}</span>
                            </LinkWrapper>
                        </li>
                    ))}
                </List>
            </ListWrapper>
           {hasSubcategories && (
                <ListWrapper className="visible subcategories">
                    <List>
                        {activeCategory?.subcategories.map((subItem) => (
                            <li key={subItem.id}>
                                <LinkWrapper href={subItem.url} className="link desc" onClick={onLinkClick}>
                                    <span>{subItem.categoryName}</span>
                                </LinkWrapper>
                            </li>
                        ))}
                    </List>
                </ListWrapper>
            )}
        </Categories>
    );
};
