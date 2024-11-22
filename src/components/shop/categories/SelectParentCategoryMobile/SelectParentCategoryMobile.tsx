import React, { FC, useEffect, useState } from 'react';
import CategoryType from '@/types/pages/shop/categories';
import { CustomSingleAccordion } from '@/components/global/accordions/CustomSingleAccordion';
import { mockCategories } from '../mock';
import { SelectParentCategoryMobileWrapper, SingleCategory } from './styles';
import { List, StyledListItem } from '@/components/global/SideList/styles';
import { Title } from '@/styles/components';
import { useAppSelector } from '@/store';

interface SelectParentCategoryMobileProps {
    selectedCategories: CategoryType[];
    switchCategory: (parentSlug: string, childSlug?: string) => void;
}

const SelectParentCategory: FC<SelectParentCategoryMobileProps> = ({ selectedCategories, switchCategory }) => {
    const categories: CategoryType[] | undefined = useAppSelector((state) => state.categoriesSlice.categories);
    const [children, setChildren] = useState<CategoryType[]>([]);
    const [parent, setParent] = useState<CategoryType | undefined>(undefined);



    useEffect(() => {
        if (categories && selectedCategories.length > 0) {
            const selectedParent = selectedCategories[0];
            setParent(selectedParent);
            const filteredChildren = categories.filter((category: CategoryType) => category.parent_id === selectedParent.id);
            setChildren(filteredChildren);
        }

    }, [categories, selectedCategories]);

    /*  console.log("selectedCategories: ", JSON.stringify(selectedCategories, null, 2));
     console.log("children: ", JSON.stringify(children, null, 2)); */
    return (
        <>
            {parent && (
                <SelectParentCategoryMobileWrapper>
                    {children.length > 0 ? (
                        <CustomSingleAccordion
                            key={parent.slug}
                            title={parent.name}
                            detailsPadding='10px 0'
                        >
                            <List>
                                {children.map((childCategory) => (
                                    <StyledListItem
                                        key={childCategory.slug}
                                        isActive={childCategory.id === selectedCategories[1]?.id}
                                    >
                                        <button onClick={() => switchCategory(parent.slug, childCategory.slug)}>
                                            {childCategory.name}
                                        </button>
                                    </StyledListItem>
                                ))}
                            </List>
                        </CustomSingleAccordion>
                    ) : (
                        <SingleCategory>
                            <Title as={'h3'} uppercase fontSize='16px' fontWeight={400}>
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