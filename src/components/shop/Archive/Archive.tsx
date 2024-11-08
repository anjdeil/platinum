import { Container, FlexBox, PagesNavigation, Title } from "@/styles/components";
import { FC, useEffect, useState } from "react";
import { CustomDataProductsStatisticType, CustomDataProductsType } from "@/types/services";
import { ProductType } from "@/types/pages/shop";
import router, { NextRouter, useRouter } from "next/router";
import { Pagination } from "@mui/material";
import { CustomSingleAccordion } from "@/components/global/accordions/CustomSingleAccordion/CustomSingleAccordion";
import { CustomCheckbox } from "@/components/global/forms/CustomCheckbox";
import { PriceFilter } from "../filtration/PriceFilter/PriceFilter";
import { FilterPanel } from "../filtration/FilterPanel";
import { ArchivePropsType } from "@/types/components/shop/archive";
import { FilterNCategoriesHead, FilterNCategoriesMenu, FilterOverlay, GridBox, SortPanel } from "./styles";
import CloseIcon from "@/components/global/icons/CloseIcon/CloseIcon";
import FilterIconButton from "@/components/global/buttons/FilterIconButton/FilterIconButton";
import { ProductCardList } from "../ProductCardsList";
import theme from "@/styles/theme";
import { useResponsive } from "@/hooks/useResponsive";
import MobileCategoriesMenu from "@/components/global/popups/MobileCategoriesMenu/MobileCategoriesMenu";
import SelectParentCategoryMobile from "../categories/SelectParentCategoryMobile/SelectParentCategoryMobile";
import CategoriesMenu from "@/components/shop/categories/CategoriesMenu/CategoriesMenu";
import { mockCategories } from "../categories/mock";
import CategoryType from "@/types/pages/shop/categories";

const switchPage = (page: number, maxPage: number) => {
    if (maxPage < page) return;
    const { slugs, ...params } = router.query;
    if (!Array.isArray(slugs)) return;

    const newSlugs = slugs.filter(slug => slug !== 'page' && Number.isNaN(+slug));
    if (page !== 1) newSlugs.push('page', String(page));

    router.push({
        pathname: router.pathname,
        query: {
            slugs: newSlugs,
            ...params
        }
    })
}

export const switchCategory = (parentSlug: string, childSlug?: string) => {
    const { slugs, ...params } = router.query;
    const newSlugs = childSlug ? [parentSlug, childSlug] : [parentSlug];

    router.push({
        pathname: router.pathname,
        query: {
            slugs: newSlugs,
            ...params
        }
    });
}

export const Archive: FC<ArchivePropsType> = ({ products, pagesCount, page, categoriesSlugs, statistic }) => {
    const [isMenuVisible, setMenuVisible] = useState(false);
    const { isMobile, } = useResponsive();
    const toggleMenu = () => {
        setMenuVisible(!isMenuVisible);
    };

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
    const AllCategories: CategoryType[] = categoriesItems.items

    const categories: CategoryType[]   = AllCategories.filter((category: CategoryType) =>
        categoriesSlugs.includes(category.slug)
      );

    return (
        <Container>
            <Title as="h2" fontWeight={600} fontSize="24px" uppercase={true} marginBottom='24px'>
                {categories[0].name}
            </Title>
            <GridBox>
                <FilterNCategoriesMenu visible={isMenuVisible}>
                    {isMenuVisible ?
                        <><FilterNCategoriesHead>
                            <h4>FILTER</h4>
                            <CloseIcon onClick={toggleMenu} />
                        </FilterNCategoriesHead>
                            {!isMobile ?
                                <CategoriesMenu switchCategory={switchCategory} selectedCategories={categories} shop={true} isMenuVisible={isMenuVisible} />
                                :
                                <>
                                    {categories.length !== 0 ?
                                        <SelectParentCategoryMobile
                                            selectedCategories={categories}
                                            switchCategory={switchCategory}
                                        />
                                        :
                                        <MobileCategoriesMenu padding="all" disableOverlay={true} width="100%" onClose={toggleMenu} switchCategory={switchCategory} />
                                    }
                                </>
                            }</>
                        :
                        <SelectParentCategoryMobile
                            selectedCategories={categories}
                            switchCategory={switchCategory}
                        />
                       /*  <CategoriesMenu isMenuVisible={isMenuVisible} switchCategory={switchCategory} selectedCategories={categories} shop={true} /> */}
                    <h3>FILTERS</h3>
                    <div style={{ margin: '50px auto' }}>
                        <FilterPanel
                            attributes={statistic.attributes}
                            maxPrice={statistic.max_price}
                            minPrice={statistic.min_price} />
                    </div>
                </FilterNCategoriesMenu>
                <FilterOverlay visible={isMenuVisible} onClick={toggleMenu} />
                <div>
                    <SortPanel>
                        <FlexBox>
                            <FilterIconButton onClick={toggleMenu} width="48px" height="48px" padding='12px' backgroundColor={theme.colors.primary} />
                            <span>sort</span>
                        </FlexBox>
                        <PagesNavigation
                            page={+page}
                            count={pagesCount}
                            siblingCount={1}
                            shape="rounded"
                            hidePrevButton
                            hideNextButton
                            onChange={(_, newPage) => { switchPage(newPage, pagesCount); }}
                        />
                    </SortPanel>
                    {products.length && <ProductCardList products={products} />}
                </div>
            </GridBox>
        </Container >
    )
}

