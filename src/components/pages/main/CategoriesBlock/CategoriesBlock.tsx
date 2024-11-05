import TitleBlock from "@/components/global/TitleBlock/TitleBlock";
import { CategoriesBlockProps } from "@/types/pages/shop";
import { FC } from "react";
import CategoryItem from "../CategoryItem/CategoryItem";
import { CategoriesBlockContainer, CategoriesList } from "./styles";

const CategoriesBlock: FC<CategoriesBlockProps> = ({ categories }) =>
{   
    return (
        <CategoriesBlockContainer>
            <TitleBlock title="ourCategories" />
            <CategoriesList>
                {categories.map((category, index) => (
                    <CategoryItem
                        key={category.id}
                        category={category}
                        double={(index % 4) > 1}
                    />
                ))}
            </CategoriesList>
        </CategoriesBlockContainer>
    );
}

export default CategoriesBlock;