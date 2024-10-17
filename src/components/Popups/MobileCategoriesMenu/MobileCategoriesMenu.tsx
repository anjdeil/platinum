import BackArrow from "@/components/Common/Icons/BackArrow/BackArrow";
import SideList from "@/components/Layouts/SideList/SideList";
import { useGetCategoriesQuery } from "@/store/rtk-queries/wpCustomApi";
import CategoryType from "@/types/shop/categories";
import { useTheme } from "@emotion/react";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import MobilePopup from "../MobilePopup/MobilePopup";
import { Title, TitleWrapper } from "./styles";

interface MobileCategoriesMenuPropsType {
    onClose: () => void
}

const MobileCategoriesMenu: FC<MobileCategoriesMenuPropsType> = ({ onClose }) => {
    const [parent, setParent] = useState<{ id: number, name: string, slug: string } | undefined>();
    const { data: categoriesData } = useGetCategoriesQuery({});
    const categories = categoriesData?.data && categoriesData.data.items as CategoryType[];
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

    return (
        <MobilePopup
            scroll={scrollTop}
            onClose={onClose}
            title={parent && renderTitle(parent.name)}
            backgroundColor={theme.colors.white}
            width="100%"
            paddingTop="22px"
            rowGap="18px"
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