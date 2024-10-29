import React, { useEffect, useState } from 'react';
import { FC } from 'react';
import CategoryType from '@/types/pages/shop/categories';
import SideCategoryList from '@/components/pages/shop/SideList/SideCategoryList';
import { MenuSkeleton } from '@/components/menus/MenuSkeleton';
import { useAppSelector } from '@/store';

interface CategoriesMenuPropsType {
    selectedCategories?: CategoryType[];
    onClick?: (parentSlug: string, childSlug: string) => void;
}

const CategoriesMenu: FC<CategoriesMenuPropsType> = ({ onClick, selectedCategories }) => {

    const [parentCategories, setParentCategories] = useState<CategoryType[] | null>(null);
    const categories: CategoryType[] | undefined = useAppSelector((state) => state.categoriesSlice.categories);
    const isCategoriesLoading: boolean = useAppSelector((state) => state.categoriesSlice.loading);

    useEffect(() => {
        if (categories) {
            const parentCategories = categories.filter((category: CategoryType) => {
                return category.slug !== "uncategorized" && category.parent_id === 0;
            });
            setParentCategories(parentCategories);
        }
    }, [categories]);

    const handleClick = (parentSlug: string, childSlug?: string) => {
        if (onClick) {
            onClick(parentSlug, childSlug || '');
        }
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
            gap='20px'
        />
    }

    return (
        <SideCategoryList
            links={categoriesLinks || []}
            onClick={handleClick}
            marginTop="15px"
            marginBottom="76px"
            mobFontSize="12px"
            mobLineHeight="16px"
        />
    );
}

export default CategoriesMenu;
