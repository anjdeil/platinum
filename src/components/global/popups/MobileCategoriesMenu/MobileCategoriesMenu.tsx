import { useEffect, useState } from 'react';
import BackArrow from "@/components/global/icons/BackArrow/BackArrow";
import SideList from "@/components/global/SideList/SideList";
import { useGetCategoriesQuery } from "@/store/rtk-queries/wpCustomApi";
import CategoryType from "@/types/pages/shop/categories";
import { useTheme } from "@emotion/react";
import { useRouter } from "next/router";
import { FC } from "react";
import MobilePopup from "../MobilePopup/MobilePopup";
import { MobileCategoriesSkeletonWrapper, TabletCategoriesSkeletonWrapper, Title, TitleWrapper } from "./styles";
import { useAppSelector } from "@/store";
import { MenuSkeleton } from "@/components/menus/MenuSkeleton";

interface MobileCategoriesMenuPropsType {
    disableOverlay?: boolean,
    padding: string,
    width: string,
    height?: string,
    onClose: () => void,
    switchCategory: (parentSlug: string, childSlug?: string) => void;
}

const MobileCategoriesMenu: FC<MobileCategoriesMenuPropsType> = ({ padding, switchCategory, onClose, width, height, disableOverlay }) => {
    const [parent, setParent] = useState<CategoryType | undefined>();
    const categories: CategoryType[] | undefined = useAppSelector((state) => state.categoriesSlice.categories);
    const theme = useTheme();
    const scrollTop = window.scrollY;


    const renderTitle = (title: string) => {
        return <TitleWrapper onClick={() => setParent(undefined)}>
            <BackArrow />
            <Title>{title}</Title>
        </TitleWrapper>
    }

    const handleClick = (slug: string, child: string | undefined) => {
        const selectedCategory = categories?.find((category: CategoryType) => category.slug === slug);
        const hasSubcategories = categories?.some((category: CategoryType) => category.parent_id === selectedCategory?.id);

        if (!parent) {
            if (hasSubcategories) {
                setParent(selectedCategory);
            } else {
                switchCategory(slug, '');
                onClose();
            }
        } else {
            switchCategory(parent.slug, slug);
            onClose();
        }
    }

    const filteredCategories = categories?.filter((category: CategoryType) => {
        if (category.slug === "uncategorized") return false;

        if (parent) {
            return category.parent_id === parent.id;
        } else {
            return category.parent_id === 0;
        }
    });

    const categoriesLinks = filteredCategories?.map(({ id, name, slug }: CategoryType) => {
        const hasSubcategories = categories?.some((category: CategoryType) => category.parent_id === id);

        return {
            name,
            url: slug,
            isActive: false,
            isNested: hasSubcategories,
        };
    });

    if (!categories || categories.length === 0) {
        if (disableOverlay) {
            return <TabletCategoriesSkeletonWrapper>
            <MenuSkeleton
                elements={6}
                direction='column'
                width='280px'
                height='40px'
                gap='30px'
            />
            </TabletCategoriesSkeletonWrapper>
        }
        else {
            return   <MobileCategoriesSkeletonWrapper>
              <MenuSkeleton
                    elements={9}
                    direction='column'
                    width='90vw'
                    height='40px'
                    gap='30px'
                />
            </MobileCategoriesSkeletonWrapper>
        }}

    return (
        <MobilePopup
            scroll={scrollTop}
            onClose={onClose}
            title={parent && renderTitle(parent.name)}
            backgroundColor={theme.colors.white}
            width={width}
            height={height}
            paddingTop="22px"
            rowGap="18px"
            disableOverlay={disableOverlay}
            padding={padding}
        >
            <SideList
                links={categoriesLinks || []}
                onClick={handleClick}
                marginTop="0"
                marginBottom="76px"
                mobFontSize="12px"
                mobLineHeight="16px"
            />
        </MobilePopup>
    );
}

export default MobileCategoriesMenu;
