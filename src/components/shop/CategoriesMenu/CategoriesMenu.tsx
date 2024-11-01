import React, { useEffect, useState } from 'react';
import { FC } from 'react';
import CategoryType from '@/types/pages/shop/categories';
import SideCategoryList from '@/components/pages/shop/SideList/SideCategoryList';
import { MenuSkeleton } from '@/components/menus/MenuSkeleton';
import { useAppSelector } from '@/store';
import { Title } from '@/styles/components';
import { CategoriesMenuWrapper } from './styles';


interface CategoriesMenuPropsType {
    selectedCategories?: CategoryType[];
    switchCategory: (parentSlug: string, childSlug?: string) => void;
}

const CategoriesMenu: FC<CategoriesMenuPropsType> = ({ switchCategory, selectedCategories }) => {
    const [parentCategories, setParentCategories] = useState<CategoryType[] | null>(null);
    const categories: CategoryType[] | undefined = useAppSelector((state) => state.categoriesSlice.categories);

    useEffect(() => {
        if (categories) {
            const parentCategories = categories.filter((category: CategoryType) => {
                return category.slug !== "uncategorized" && category.parent_id === 0;
            });
            setParentCategories(parentCategories);
        }
    }, [categories]);

    const handleClick = (parentSlug: string, childSlug?: string) => {
            switchCategory(parentSlug, childSlug || '');
    };

    const categoriesLinks = parentCategories?.map(({ id, name, slug }: CategoryType) => {
        const hasSubcategories = categories?.some((category: CategoryType) => category.parent_id === id);
        const childrenCategories = categories?.filter((category: CategoryType) => category.parent_id === id);

        const isActive = selectedCategories?.some((selectedCategory) => selectedCategory.slug === slug) || false;
        const activeChildren = childrenCategories?.map((child: CategoryType) => ({
            ...child,
            isActive: selectedCategories?.some((selectedCategory) => selectedCategory.slug === child.slug) || false,
        }));

        return {
            name,
            url: slug,
            isActive,
            isNested: hasSubcategories,
            children: activeChildren,
        };
    });

    if (!categories || categories.length === 0) {
        return <MenuSkeleton
            elements={10}
            direction='column'
            width='100%'
            height='40px'
            gap='30px'
        />
    }

    return (
        <CategoriesMenuWrapper>
            <Title as="h2" fontWeight={600} fontSize="24px" uppercase={true} marginBottom='16px'>
                all shop
            </Title>
            <SideCategoryList
                links={categoriesLinks || []}
                onClick={handleClick}
                marginTop="0"
                marginBottom="0"
                mobFontSize="12px"
                mobLineHeight="16px"
            />
        </CategoriesMenuWrapper>


    );
}

export default CategoriesMenu;
