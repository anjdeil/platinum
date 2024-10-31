import BackArrow from "@/components/global/icons/BackArrow/BackArrow";
import SideList from "@/components/global/SideList/SideList";
import { useGetCategoriesQuery } from "@/store/rtk-queries/wpCustomApi";
import CategoryType from "@/types/pages/shop/categories";
import { useTheme } from "@emotion/react";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import MobilePopup from "../MobilePopup/MobilePopup";
import { Title, TitleWrapper } from "./styles";
import { useAppSelector } from "@/store";
import { MenuSkeleton } from "@/components/menus/MenuSkeleton";

interface MobileCategoriesMenuPropsType {
    disableOverlay?: boolean,
    width: string,
    height?: string,
    onClose: () => void
}

const MobileCategoriesMenu: FC<MobileCategoriesMenuPropsType> = ({ onClose, width, height, disableOverlay}) => {
    const [parent, setParent] = useState<{ id: number, name: string, slug: string } | undefined>();
    const categories: CategoryType[] | undefined = useAppSelector((state) => state.categoriesSlice.categories);
    
    const router = useRouter();
    const theme = useTheme();
    const scrollTop = window.scrollY;
    
    const renderTitle = (title: string) => (
        <TitleWrapper onClick={() => setParent(undefined)}>
            <BackArrow />
            <Title>{title}</Title>
        </TitleWrapper>
    )

    const handleClick = (slug: string) => {
        const selectedCategory = categories?.find((category: CategoryType) => category.slug === slug);
        const hasSubcategories = categories?.some((category: CategoryType) => category.parent_id === selectedCategory?.id);

        if (!parent) {
            if (hasSubcategories) {
                setParent(selectedCategory);
            } else {
                router.push(`/product-category/${slug}`);
                onClose();
            }
        } else {
            router.push(`/product-category/${parent.slug}/${slug}`)
            onClose();
        }
    }

    const filteredCategories = categories?.filter((category: CategoryType) => {
        if (category.slug === "uncategorized") return false;

        if (parent !== undefined) {
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
        return <MenuSkeleton
            elements={6}
            direction='column'
            width='270px'
            height='40px'
            gap='20px'
        />
    }

    console.log(categories);
    

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
        > 
            <SideList
                links={categoriesLinks || []}
                onClick={handleClick}
                marginTop="15px"
                marginBottom="76px"
                mobFontSize="12px"
                mobLineHeight="16px"
            />
        </MobilePopup> 
    );
}

export default MobileCategoriesMenu;