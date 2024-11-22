import { Container, FlexBox, PagesNavigation, Title } from "@/styles/components";
import { FC, useEffect, useMemo, useState } from "react";
import router from "next/router";
import { FilterPanel } from "../filtration/FilterPanel";
import { ArchivePropsType } from "@/types/components/shop/archive";
import { FilterNCategoriesHead, FilterNCategoriesMenu, FilterOverlay, GridBox, SortPanel } from "./styles";
import CloseIcon from "@/components/global/icons/CloseIcon/CloseIcon";
import FilterIconButton from "@/components/global/buttons/FilterIconButton/FilterIconButton";
import { ProductCardList } from "../ProductCardsList";
import theme from "@/styles/theme";
import { useResponsive } from "@/hooks/useResponsive";
import MobileCategoriesMenu from "@/components/global/popups/MobileCategoriesMenu/MobileCategoriesMenu";
import SelectParentCategory from "../categories/SelectParentCategoryMobile/SelectParentCategoryMobile";
import CategoriesMenu from "@/components/shop/categories/CategoriesMenu/CategoriesMenu";
import CategoryType from "@/types/pages/shop/categories";
import { useAppSelector } from "@/store";

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
    });
};

export const switchCategory = (parentSlug: string, childSlug?: string) => {
    const { slugs, ...params } = router.query;
    const newSlugs = childSlug ? [parentSlug, childSlug] : [parentSlug];

    router.push(
        {
            pathname: router.pathname,
            query: {
                slugs: newSlugs,
                ...params
            }
        },

    );
};

export const Archive: FC<ArchivePropsType> = ({ products, pagesCount, page, categoriesSlugs, statistic }) => {
    const [isMenuVisible, setMenuVisible] = useState(false);
    const { isMobile } = useResponsive();
    const toggleMenu = () => {
        setMenuVisible(!isMenuVisible);
    };

    const [selectedCategories, setCategories] = useState<CategoryType[]>([]);

    const categoriesData: CategoryType[] | undefined = useAppSelector((state) => state.categoriesSlice.categories);

    const isLoading: boolean | undefined = useAppSelector((state) => state.categoriesSlice.loading);

    useEffect(() => {
        if (!categoriesData || categoriesData.length === 0) {
            setCategories([]);
            return;
        }

        const filteredCategories = categoriesData.filter((category) =>
            categoriesSlugs.includes(category.slug)
        );
        setCategories(filteredCategories);
        console.log('categoriesData use effect', JSON.stringify(categoriesData, null, 2));

    }, [categoriesData, categoriesSlugs]);

    console.log('categoriesData ', JSON.stringify(categoriesData, null, 2));
    console.log(categoriesSlugs);
    /* 
        if (isLoading) return <div>categories loading</div> */
    return (
        <Container>
            <Title as="h2" fontWeight={600} fontSize="24px" uppercase={true} marginBottom='24px'>
                {!isLoading && selectedCategories.length > 0 ? selectedCategories[0].name : 'loading'}
            </Title>
            <GridBox>
                <FilterNCategoriesMenu visible={isMenuVisible}>
                    {isMenuVisible ? (
                        <>
                            <FilterNCategoriesHead>
                                <h4>FILTER</h4>
                                <CloseIcon onClick={toggleMenu} />
                            </FilterNCategoriesHead>
                            {!isMobile ? (
                                <CategoriesMenu switchCategory={switchCategory} selectedCategories={selectedCategories} shop={true} isMenuVisible={isMenuVisible} />
                            ) : (
                                <>
                                    {selectedCategories.length !== 0 ? (
                                        <SelectParentCategory
                                            selectedCategories={selectedCategories}
                                            switchCategory={switchCategory}
                                        />
                                    ) : (
                                        <MobileCategoriesMenu padding="all" disableOverlay={true} width="100%" onClose={toggleMenu} switchCategory={switchCategory} />
                                    )}
                                </>
                            )}
                        </>
                    ) : (
                        <SelectParentCategory
                            selectedCategories={selectedCategories}
                            switchCategory={switchCategory}
                        />
                    )}
                    <h3>FILTERS</h3>
                    <div style={{ margin: '50px auto' }}>
                        <FilterPanel
                            attributes={statistic.attributes}
                            maxPrice={statistic.max_price}
                            minPrice={statistic.min_price}
                        />
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
        </Container>
    );
};

export default Archive;
