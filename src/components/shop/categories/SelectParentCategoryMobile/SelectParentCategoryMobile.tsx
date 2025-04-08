import React, { FC, useEffect, useState } from "react";
import { CustomSingleAccordion } from "@/components/global/accordions/CustomSingleAccordion";
import { SelectParentCategoryMobileWrapper, SingleCategory } from "./styles";
import { List, StyledListItem } from "@/components/global/SideList/styles";
import { Title } from "@/styles/components";
import { useAppSelector } from "@/store";
import CategoryType from "@/types/components/shop/categories/categories";

interface SelectParentCategoryMobileProps {
  selectedCategories: CategoryType[];
  switchCategory: (parentSlug: string, childSlug?: string) => void;
}

const SelectParentCategory: FC<SelectParentCategoryMobileProps> = ({
  selectedCategories,
  switchCategory,
}) => {
  const categories: CategoryType[] | undefined = useAppSelector(
    state => state.categoriesSlice.categories
  );
  const [children, setChildren] = useState<CategoryType[]>([]);
  const [parent, setParent] = useState<CategoryType | undefined>(undefined);

  useEffect(() => {
    if (categories && selectedCategories.length > 0) {
      const selectedParent = selectedCategories[0];
      setParent(selectedParent);

      const filteredChildren = categories
        .filter(
          (category: CategoryType) => category.parent_id === selectedParent.id
        )
        .sort((a, b) => a.menu_order - b.menu_order);

      setChildren(filteredChildren);
    }
  }, [categories, selectedCategories]);

  return (
    <>
      {parent && (
        <SelectParentCategoryMobileWrapper>
          {children.length > 0 ? (
            <CustomSingleAccordion key={parent.slug} title={parent.name}>
              <List>
                {children.map(childCategory => (
                  <StyledListItem
                    btnpadding="12px 16px"
                    key={childCategory.slug}
                    isActive={childCategory.id === selectedCategories[1]?.id}
                  >
                    <button
                      onClick={() =>
                        switchCategory(parent.slug, childCategory.slug)
                      }
                    >
                      {childCategory.name}
                    </button>
                  </StyledListItem>
                ))}
              </List>
            </CustomSingleAccordion>
          ) : (
            <SingleCategory>
              <Title as={'h3'} uppercase fontSize="16px" fontWeight={400}>
                {parent.name}
              </Title>
            </SingleCategory>
          )}
        </SelectParentCategoryMobileWrapper>
      )}
    </>
  );
};

export default SelectParentCategory;
