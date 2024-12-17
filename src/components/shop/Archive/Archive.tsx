import { CustomSortAccordion } from "@/components/global/accordions/CustomSortAccordion";
import Breadcrumbs from "@/components/global/Breadcrumbs/Breadcrumbs";
import FilterButton from "@/components/global/buttons/FilterButton/FilterButton";
import {
  CatalogContainer,
  CatalogFilterBlock,
  CatalogLayout,
  CatalogListBlock,
  CatalogRightWrapper,
  CatalogTitleWrapper,
  CatalogTopWrapper,
  CountProduct,
  FilterSortWrapper,
  FIlterWrapper,
  PagesNavigationWrapper,
} from "./styles";
import SideList from "@/components/global/SideList/SideList";
import transformCategoriesIntoLinks from "@/services/transformers/transformCategoriesIntoLinks";
import { useTranslations } from "next-intl";
import { CategoryType } from "@/types/pages/shop";
import { useGetCategoriesQuery } from "@/store/rtk-queries/wpCustomApi";
import transformSubcategoriesIntoLinks from "@/services/transformers/transformSubcategoriesIntoLinks";
import { Container, FlexBox, PagesNavigation, Title } from "@/styles/components";
import { FC, useEffect, useMemo, useState } from "react";
import router from "next/router";
import { FilterPanel } from "../filtration/FilterPanel";
import { ArchivePropsType } from "@/types/components/shop/archive";
import {
  FilterNCategoriesHead,
  FilterNCategoriesMenu,
  FilterOverlay,
  GridBox,
  SortPanel,
} from "./styles";
import CloseIcon from "@/components/global/icons/CloseIcon/CloseIcon";
import FilterIconButton from "@/components/global/buttons/FilterIconButton/FilterIconButton";
import { ProductCardList } from "../ProductCardsList";
import theme from "@/styles/theme";
import { useResponsive } from "@/hooks/useResponsive";
import MobileCategoriesMenu from "@/components/global/popups/MobileCategoriesMenu/MobileCategoriesMenu";
import SelectParentCategory from "../categories/SelectParentCategoryMobile/SelectParentCategoryMobile";
import CategoriesMenu from "@/components/shop/categories/CategoriesMenu/CategoriesMenu";

import { useAppSelector } from "@/store";

const switchPage = (page: number, maxPage: number) => {
  if (maxPage < page) return;
  const { slugs, ...params } = router.query;
  if (!Array.isArray(slugs)) return;

  const newSlugs = slugs.filter((slug) => slug !== "page" && Number.isNaN(+slug));
  if (page !== 1) newSlugs.push("page", String(page));

  router.push({
    pathname: router.pathname,
    query: {
      slugs: newSlugs,
      ...params,
    },
  });
};

export const switchCategory = (parentSlug: string, childSlug?: string) => {
  const { slugs, ...params } = router.query;
  const newSlugs = childSlug ? [parentSlug, childSlug] : [parentSlug];

  router.push({
    pathname: router.pathname,
    query: {
      slugs: newSlugs,
      ...params,
    },
  });
};
export const Archive: FC<ArchivePropsType> = (props) => {
  const { products, categories, pagesCount, page, statistic, locale, categoriesSlugs } = props;

  const t = useTranslations("Archive");

  const currentCategory = Array.isArray(categories)
    ? (categories[categories.length - 1] as CategoryType)
    : null;

  /**
   * Formulate categories links for breadcrumbs
   */
  const categoriesBreadcrumbsLinks = transformCategoriesIntoLinks(categories || []);
  const breadcrumbsLinks = [
    {
      name: t("goHome"),
      url: locale === "en" ? "/" : `/${locale}`,
    },
    ...categoriesBreadcrumbsLinks,
  ];

  /**
   * Formulate subcategories links for sidebar
   */
  const { data: allCategoriesData } = useGetCategoriesQuery({ lang: locale });
  const allCategories = allCategoriesData?.data?.items;

  const parentCategoryId = currentCategory?.parent_id
    ? currentCategory.parent_id
    : currentCategory?.id;
  const parentCategory = allCategories?.find(({ id }) => id === parentCategoryId);
  const parentCategorySlug = parentCategory?.parent_id === 0 ? parentCategory?.slug : null;

  const subcategories = allCategories?.filter(({ parent_id }) => parent_id === parentCategoryId);
  const subcategoriesLinks = transformSubcategoriesIntoLinks(
    subcategories || [],
    parentCategorySlug,
    currentCategory?.id
  );

  const [isMenuVisible, setMenuVisible] = useState(false);
  const { isMobile } = useResponsive();
  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  const [selectedCategories, setCategories] = useState<CategoryType[]>([]);

  const categoriesData: CategoryType[] | undefined = useAppSelector(
    (state) => state.categoriesSlice.categories
  );

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
  }, [categoriesData, categoriesSlugs]);

  /* 
        if (isLoading) return <div>categories loading</div> */
  return (
    <CatalogContainer>
      <CatalogTitleWrapper>
        <Breadcrumbs links={breadcrumbsLinks} />
        <Title as="h1" uppercase>
          {currentCategory?.name}
        </Title>
      </CatalogTitleWrapper>
      <CatalogLayout>
        <CatalogFilterBlock>
          <FilterNCategoriesMenu visible={isMenuVisible}>
            {isMenuVisible ? (
              <>
                <FilterNCategoriesHead>
                  <h4>FILTER</h4>
                  <CloseIcon onClick={toggleMenu} />
                </FilterNCategoriesHead>
                {!isMobile ? (
                  <CategoriesMenu
                    switchCategory={switchCategory}
                    selectedCategories={selectedCategories}
                    shop={true}
                    isMenuVisible={isMenuVisible}
                  />
                ) : (
                  <>
                    {selectedCategories.length !== 0 ? (
                      <SelectParentCategory
                        selectedCategories={selectedCategories}
                        switchCategory={switchCategory}
                      />
                    ) : (
                      <MobileCategoriesMenu
                        padding="all"
                        disableOverlay={true}
                        width="100%"
                        onClose={toggleMenu}
                        switchCategory={switchCategory}
                      />
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
          </FilterNCategoriesMenu>
          <FilterOverlay visible={isMenuVisible} onClick={toggleMenu} />
          <Title as="h3" uppercase textalign="left" marginBottom="24px">
            Filters
          </Title>
          <FilterPanel
            attributes={statistic.attributes}
            maxPrice={statistic.max_price || 0}
            minPrice={statistic.min_price || 0}
          />
        </CatalogFilterBlock>
        <CatalogRightWrapper>
          <CatalogTopWrapper>
            <FilterSortWrapper>
              <FIlterWrapper>
                <FilterButton />
              </FIlterWrapper>
              <CustomSortAccordion />
            </FilterSortWrapper>
            <CountProduct>{`${statistic.products_count} products`}</CountProduct>
            <PagesNavigationWrapper>
              <PagesNavigation
                page={+page}
                count={pagesCount}
                siblingCount={1}
                shape="rounded"
                hidePrevButton
                hideNextButton
                onChange={(_, newPage) => {
                  switchPage(newPage, pagesCount);
                }}
              />
            </PagesNavigationWrapper>
          </CatalogTopWrapper>
          <CatalogListBlock>
            {products.length && (
              <ProductCardList
                products={products}
                columns={{
                  mobileColumns: 2,
                  tabletColumns: 4,
                  desktopColumns: 3,
                }}
              />
            )}
          </CatalogListBlock>
        </CatalogRightWrapper>
      </CatalogLayout>
    </CatalogContainer>
  );
};

export default Archive;
