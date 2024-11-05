import transformCategoriesMenu from "@/services/transformers/transformCategoriesMenu";
import { useAppDispatch, useAppSelector } from "@/store";
import { useGetCategoriesQuery } from "@/store/rtk-queries/wpCustomApi";
import MenuCategoriesSlice from "@/store/slices/MenuCategoriesSlice";
import { FC, useCallback } from "react";
import { Categories, ChildListWrapper, LinkWrapper, List, ListWrapper } from "./styles";
import CategoryType from "@/types/pages/shop/categories";
import { mockCategories } from "@/components/shop/categories/mock";
import { Title } from "@/styles/components";
import { MenuSkeleton } from "@/components/menus/MenuSkeleton";
import ForwardArrow from "@/components/global/icons/ForwardArrow/ForwardArrow";
import { CategoriesMenuPropsType } from "@/types/components/shop/categories/categoriesMenu";



const CategoriesMenu: FC<CategoriesMenuPropsType> = ({ switchCategory, selectedCategories, shop, isMenuVisible }) => {
       /*    const categories: CategoryType[] | undefined = useAppSelector((state) => state.categoriesSlice.categories); */
    //mockdata
    const jsonObj = JSON.parse(mockCategories)
    const categoriesItems = {
        items: jsonObj.data.items.map((item: CategoryType) => ({ id: item.id, parent_id: item.parent_id, name: item.name, slug: item.slug, description: item.description, count: item.count, language_code: item.language_code }))
    };
    const categoriesData: CategoryType[] = categoriesItems.items

    const categories = transformCategoriesMenu(categoriesData)
    //-----------------------------------------------------------------------
    const dispatch = useAppDispatch();
    const popup = useAppSelector(state => state.Popup);
    const { isOpen, CategoryActiveHover } = useAppSelector(state => state.MenuCategoriesSlice);
    const { setMenuOpen, setCategory } = MenuCategoriesSlice.actions;

    const onLinkClick = useCallback(() => {
        if (isOpen) {
            dispatch(setMenuOpen(false));
            dispatch(setCategory(null));
        }
    }, [isOpen, dispatch, setMenuOpen, setCategory]);

    const onMouseLeave = useCallback(() => {
        dispatch(setCategory(null));
    }, [dispatch, setCategory]);

    const activeCategoryHover = CategoryActiveHover ? categories.find(category => category.id === CategoryActiveHover) : null;
    const hasSubcategories = activeCategoryHover?.subcategories && activeCategoryHover.subcategories.length > 0;

    if (!categories || categories.length === 0) {
        return <MenuSkeleton
            elements={7}
            direction='column'
            width='100%'
            height='40px'
            gap='30px'
        />
    }

    return (
        <>
            {!isMenuVisible &&
                <Title textalign='left' as="h2" fontWeight={600} fontSize="24px" uppercase={true} marginBottom='16px'>
                    all shop
                </Title>
            }
            <Categories onMouseLeave={onMouseLeave} shop={shop} className={popup === "categories-menu" ? "active close-outside" : ''} >
                <ListWrapper shop={shop}>
                    <List>
                        {categories.map((category) => (
                            <li key={category.id}>
                                <LinkWrapper href={category.url}
                                    onMouseEnter={() => dispatch(setCategory(category.id))}
                                    onClick={onLinkClick}
                                    isActive={selectedCategories?.some(selected => selected.id === category.id) || false}
                                    isActiveHover={activeCategoryHover?.id === category.id || false}
                                >
                                    <span>
                                          {category.subcategories && category.subcategories.length > 0 && <ForwardArrow />}
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
                            {activeCategoryHover?.subcategories.map((subItem) => (
                                <li key={subItem.id}>
                                    <LinkWrapper 
                                    href={subItem.url} 
                                    onClick={onLinkClick}
                                    isActive={selectedCategories?.some(selected => selected.id === subItem.id) || false}>
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