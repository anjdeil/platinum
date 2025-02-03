import ForwardArrow from '@/components/global/icons/ForwardArrow/ForwardArrow';
import { MenuSkeleton } from '@/components/menus/MenuSkeleton';
import transformCategoriesMenu from '@/services/transformers/transformCategoriesMenu';
import { useAppDispatch, useAppSelector } from '@/store';
import MenuCategoriesSlice from '@/store/slices/MenuCategoriesSlice';
import { Title } from '@/styles/components';
import CategoryType from '@/types/components/shop/categories/categories';
import { CategoriesMenuPropsType } from '@/types/components/shop/categories/categoriesMenu';
import { FC, useCallback, useEffect } from 'react';
import {
  Categories,
  ChildListWrapper,
  LinkWrapper,
  List,
  ListWrapper,
} from './styles';
import { popupClosed } from '@/store/slices/PopupSlice';

const CategoriesMenu: FC<CategoriesMenuPropsType> = ({
  selectedCategories,
  shop,
  isMenuVisible,
}) => {
  const categoriesData: CategoryType[] | undefined = useAppSelector(
    state => state.categoriesSlice.categories
  );
  const categories = transformCategoriesMenu(categoriesData);

  const dispatch = useAppDispatch();
  const popup = useAppSelector(state => state.popup);
  useEffect(() => {
    console.log(popup);
  }, [popup]);

  const { isOpen, CategoryActiveHover } = useAppSelector(
    state => state.MenuCategoriesSlice
  );
  const { setMenuOpen, setCategory } = MenuCategoriesSlice.actions;

  const onLinkClick = useCallback(() => {
    if (isOpen) {
      dispatch(setMenuOpen(false));
      dispatch(setCategory(null));
    }
  }, [isOpen, dispatch]);

  const onMouseLeave = useCallback(() => {
    dispatch(setCategory(null));
    dispatch(popupClosed());
  }, [dispatch]);

  const activeCategoryHover = CategoryActiveHover
    ? categories.find(category => category.id === CategoryActiveHover)
    : null;
  const hasSubcategories =
    activeCategoryHover?.subcategories &&
    activeCategoryHover.subcategories.length > 0;

  if (!categories || categories.length === 0) {
    return (
      <MenuSkeleton
        elements={7}
        direction="column"
        width="100%"
        height="40px"
        gap="30px"
      />
    );
  }

  return (
    <>
      {!isMenuVisible && (
        <Title
          textalign="left"
          as="h2"
          fontWeight={600}
          fontSize="24px"
          uppercase={true}
          marginBottom="16px"
        >
          all shop
        </Title>
      )}
      <Categories
        onMouseLeave={onMouseLeave}
        shop={shop}
        className={
          popup === 'categories-menu' ? 'active hover close-outside' : ''
        }
      >
        <ListWrapper shop={shop}>
          <List>
            {categories.map(category => (
              <li key={category.id}>
                <LinkWrapper
                  href={category.url}
                  onMouseEnter={() => dispatch(setCategory(category.id))}
                  onClick={onLinkClick}
                  isactive={
                    selectedCategories?.some(
                      selected => selected.id === category.id
                    )
                      ? true
                      : undefined
                  }
                  isactivehover={
                    activeCategoryHover?.id === category.id ? true : undefined
                  }
                >
                  <span>
                    {category.subcategories &&
                      category.subcategories.length > 0 && <ForwardArrow />}
                    {category.categoryName}
                  </span>
                </LinkWrapper>
              </li>
            ))}
          </List>
        </ListWrapper>
        {hasSubcategories && (
          <ChildListWrapper shop={shop} isVisible={true} isSubcategories={true}>
            <List>
              {activeCategoryHover?.subcategories.map(subItem => (
                <li key={subItem.id}>
                  <LinkWrapper
                    href={subItem.url}
                    onClick={onLinkClick}
                    isactive={
                      selectedCategories?.some(
                        selected => selected.id === subItem.id
                      ) || false
                    }
                  >
                    <span>{subItem.categoryName}</span>
                  </LinkWrapper>
                </li>
              ))}
            </List>
          </ChildListWrapper>
        )}
      </Categories>
    </>
  );
};

export default CategoriesMenu;
