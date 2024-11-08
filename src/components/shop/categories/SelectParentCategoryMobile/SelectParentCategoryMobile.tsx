import React, { FC } from 'react';
import CategoryType from '@/types/pages/shop/categories';
import { CustomSingleAccordion } from '@/components/global/accordions/CustomSingleAccordion';
import { mockCategories } from '../mock';
import { SelectParentCategoryMobileWrapper, SingleCategory } from './styles';
import { List, StyledListItem } from '@/components/global/SideList/styles';
import { Title } from '@/styles/components';

interface SelectParentCategoryMobileProps {
    selectedCategories: CategoryType[];
    switchCategory: (parentSlug: string, childSlug?: string) => void;
}

const SelectParentCategoryMobile: FC<SelectParentCategoryMobileProps> = ({ selectedCategories, switchCategory }) => {
    /*    const categories: CategoryType[] | undefined = useAppSelector((state) => state.categoriesSlice.categories); */

    const jsonObj = JSON.parse(mockCategories)
    const categoriesItems = {
        items: jsonObj.data.items.map((item: CategoryType) => ({
            id: item.id,
            parent_id: item.parent_id,
            name: item.name,
            slug: item.slug,
            description: item.description,
            count: item.count,
            language_code: item.language_code
        }))
    };
    const categories: CategoryType[] = categoriesItems.items

    //-----------------------------------
    selectedCategories

    const parent = selectedCategories[0]
    const children = categories.filter((category: CategoryType) => {
        return category.parent_id === parent.id
    })

    return (
        <SelectParentCategoryMobileWrapper>
            {children.length !== 0 ?
                <CustomSingleAccordion
                    key={parent.slug}
                    title={parent.name}
                    detailsPadding='10px 0 '
                >
                    <List>
                        {children.map((childCategory) => (
                            <StyledListItem
                                key={childCategory.slug}
                                isActive={childCategory?.id === selectedCategories[1]?.id}
                            >
                                <button onClick={() => switchCategory(parent.slug, childCategory.slug)}>
                                    {childCategory.name}
                                </button>
                            </StyledListItem>
                        ))}
                    </List>
                </CustomSingleAccordion>
                :
                <SingleCategory>
                       <Title as={'h3'} uppercase fontSize='16px' fontWeight={400}>   {parent.name}</Title>
                </SingleCategory>
            }
        </SelectParentCategoryMobileWrapper>
    );
};

export default SelectParentCategoryMobile;
