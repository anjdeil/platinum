import transformCategoriesMenu from "@/services/transformers/transformCategoriesMenu";
import { useAppDispatch, useAppSelector } from "@/store";
import { useGetCategoriesQuery } from "@/store/rtk-queries/wpCustomApi";
import MenuCategoriesSlice from "@/store/slices/MenuCategoriesSlice";
import { useCallback } from "react";
import { Categories, LinkWrapper, List, ListWrapper } from "./styles";


export const CategoriesMenu = () => {
  const dispatch = useAppDispatch();
  const { isOpen, isCategoryActive } = useAppSelector(state => state.MenuCategoriesSlice);
  const popup = useAppSelector(state => state.Popup);
  const { setMenuOpen, setCategory } = MenuCategoriesSlice.actions;
  const { data: categoriesData = [] } = useGetCategoriesQuery({});    
  const categories = categoriesData?.data ? transformCategoriesMenu(categoriesData.data.items) : [];

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
                          <LinkWrapper href={category.url} className={isCategoryActive === category.id ? "active" : ""} 
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
                              <LinkWrapper href={subItem.url} onClick={onLinkClick}>
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
