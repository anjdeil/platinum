import BackArrow from "@/components/global/icons/BackArrow/BackArrow";
import SideList from "@/components/global/SideList/SideList";
import { useGetCategoriesQuery } from "@/store/rtk-queries/wpCustomApi";
import CategoryType from "@/types/pages/shop/categories";
import { useTheme } from "@emotion/react";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { List, SideListContainer, StyledListItem, Title, TitleWrapper } from "./styles";
import ForwardArrow from "@/components/global/icons/ForwardArrow/ForwardArrow";
import { LangParamType } from "@/types/services";

interface CategoriesMenuPropsType {
    categories?: CategoryType[];
    onClick?: (slug: string) => void;
    onClose: () => void;
}

const CategoriesMenu: FC<CategoriesMenuPropsType> = ({ onClose, onClick }) => {
    const { locale } = useRouter();
    const langParam: LangParamType | object = locale ? { lang: locale } : {};
    const { data: categoriesData, isLoading: isCategoriesLoading } = useGetCategoriesQuery(langParam);

    const [categories, setCategories] = useState<CategoryType[] | null>(null);

    useEffect(() => {
        if (categoriesData) {
            setCategories(categoriesData.data.items);
        }
    }, [categoriesData]);

    const [openCategories, setOpenCategories] = useState<number[]>([]);
    const theme = useTheme();

    const toggleCategory = (id: number) => {
        setOpenCategories(prev =>
            prev.includes(id) ? prev.filter(categoryId => categoryId !== id) : [...prev, id]
        );
    };

    const handleClick = (slug: string) => {
        const selectedCategory = categories?.find((category: CategoryType) => category.slug === slug);
        const hasSubcategories = categories?.some((category: CategoryType) => category.parent_id === selectedCategory?.id);

        if (hasSubcategories) {
            toggleCategory(selectedCategory!.id);
        } else {
            if (onClick) {
                onClick(slug);
            }
            onClose();
        }
    };

    const renderCategories = (categories: CategoryType[]) => {
        return categories.map((category) => {
            const hasSubcategories = categories.some((subCategory) => subCategory.parent_id === category.id);
            const subCategories = categories.filter((subCategory) => subCategory.parent_id === category.id);

            return (
                <div key={category.id}>
                    <StyledListItem
                        key={category.name}
                        fontSize="14px"
                        lineHeight="18px"
                        fontWeight={500}
                        borderRadius="4px"
                        hoverColor={theme.colors.white}
                        hoverBackground={theme.colors.primary}
                        isActive={false}
                    >
                        <button onClick={() => handleClick(category.slug)}>
                            {hasSubcategories && (
                                <ForwardArrow />
                            )}
                            <span>{category.name}</span>
                        </button>
                    </StyledListItem>
                    {openCategories.includes(category.id) && subCategories.length > 0 && (
                        <div style={{ marginLeft: '20px' }}>
                            {renderCategories(subCategories)}
                        </div>
                    )}
                </div>
            );
        });
    };

    return (
        <div>
            <SideListContainer>
                <List>
                    {renderCategories(categories?.filter((category) => category.parent_id === 0) || [])}
                </List>
            </SideListContainer>
        </div>
    );
};

export default CategoriesMenu;
