import SideList from "@/components/Layouts/SideList/SideList";
import { useGetCategoriesQuery } from "@/store/rtk-queries/wpCustomApi";
import CategoryType from "@/types/services/wpCustomApi/CategoryType";
import { useTheme } from "@emotion/react";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import MobilePopup from "../MobilePopup/MobilePopup";
import { BackButton, Title, TitleWrapper } from "./styles";

interface MobileCategoriesMenuPropsType {
    onClose: () => void
}

const MobileCategoriesMenu: FC<MobileCategoriesMenuPropsType> = ({ onClose }) => {
    const [parent, setParent] = useState<{ id: number, name: string, slug: string } | undefined>();
    const { data: categoriesData } = useGetCategoriesQuery({});
    const categories = categoriesData?.data && categoriesData.data.items as CategoryType[];
    const router = useRouter();
    const theme = useTheme();

    const renderTitle = (title: string) => (
        <TitleWrapper  onClick={() => setParent(undefined)}>
            <BackButton>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="24" viewBox="0 0 12 24" fill="none">
                    <path d="M9.54801 17.42L8.48701 18.48L2.70801 12.703C2.61486 12.6104 2.54093 12.5004 2.49048 12.3791C2.44003 12.2579 2.41406 12.1278 2.41406 11.9965C2.41406 11.8652 2.44003 11.7352 2.49048 11.6139C2.54093 11.4927 2.61486 11.3826 2.70801 11.29L8.48701 5.51001L9.54701 6.57001L4.12301 11.995L9.54801 17.42Z" fill="black"/>
                </svg>
            </BackButton>
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

    const categoriesLinks = filteredCategories?.map(({ name, slug }: CategoryType) => ({
        name,
        slug,
    }));

    return (
        <MobilePopup
            onClose={onClose}
            title={parent && renderTitle(parent.name)}
            backgroundColor={theme.colors.white}
            width="100%"
            paddingTop="22px"
        >
            <SideList links={categoriesLinks} onClick={handleClick} />
        </MobilePopup>
    );
}

export default MobileCategoriesMenu;