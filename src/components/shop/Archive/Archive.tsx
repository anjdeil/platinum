import { CustomSortAccordion } from '@/components/global/accordions/CustomSortAccordion';
import Breadcrumbs from '@/components/global/Breadcrumbs/Breadcrumbs';
import FilterButton from '@/components/global/buttons/FilterButton/FilterButton';
import CloseIcon from '@/components/global/icons/CloseIcon/CloseIcon';
import Notification from '@/components/global/Notification/Notification';
import MobileCategoriesMenu from '@/components/global/popups/MobileCategoriesMenu/MobileCategoriesMenu';
import CategoriesMenu from '@/components/shop/categories/CategoriesMenu/CategoriesMenu';
import { useResponsive } from '@/hooks/useResponsive';
import transformCategoriesIntoLinks from '@/services/transformers/transformCategoriesIntoLinks';
import { useAppSelector } from '@/store';
import { PagesNavigation, Title } from '@/styles/components';
import { ArchivePropsType } from '@/types/components/shop/archive';
import { CategoryType } from '@/types/pages/shop';
import { getPluralForm } from '@/utils/getPluralForm';
import { Skeleton } from '@mui/material';
import { useTranslations } from 'next-intl';
import router from 'next/router';
import { FC, useState } from 'react';
import SelectParentCategory from '../categories/SelectParentCategoryMobile/SelectParentCategoryMobile';
import { FilterPanel } from '../filtration/FilterPanel';
import { ProductCardList } from '../ProductCardsList';
import {
  CatalogContainer,
  CatalogFilterBlock,
  CatalogLayout,
  CatalogListBlock,
  CatalogRightWrapper,
  CatalogTitleWrapper,
  CatalogTopWrapper,
  CountProduct,
  FilterNCategoriesHead,
  FilterOverlay,
  FilterSortWrapper,
  FilterWrapper,
  PagesNavigationFooterWrapper,
  PagesNavigationWrapper,
} from './styles';
import {
  BreadcrumbLink,
  BreadcrumbsList,
  BreadcrumbsWrapper,
} from '@/components/global/Breadcrumbs/styles';

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
      ...params,
    },
  });
};

export const switchCategory = (parentSlug: string, childSlug?: string) => {
  const { query } = router;

  const newPath = `/product-category/${parentSlug}${
    childSlug ? `/${childSlug}` : ''
  }`;

  const newQuery = {
    ...query,
    slugs: childSlug ? [parentSlug, childSlug] : [parentSlug],
  };

  router.push({
    pathname: newPath,
    query: newQuery,
  });
};

export const Archive: FC<ArchivePropsType> = props => {
  const {
    products,
    categories = [],
    searchTerm,
    pagesCount,
    page,
    statistic,
    locale,
    defaultLocale,
  } = props;
  const t = useTranslations('Archive');

  const currentCategory = Array.isArray(categories)
    ? (categories[categories.length - 1] as CategoryType)
    : null;

  /**
   * Formulate categories links for breadcrumbs
   */
  const categoriesBreadcrumbsLinks = transformCategoriesIntoLinks(
    categories || []
  );

  const breadcrumbsLinks = [
    {
      name: t('goHome'),
      url: locale === defaultLocale ? '/' : `/${locale}`,
    },
    ...(searchTerm && categories.length === 0
      ? [{ name: t('searchResults'), url: '#' }]
      : categoriesBreadcrumbsLinks),
  ];

  /**
   * Formulate subcategories links for sidebar
   */

  const [isMenuVisible, setMenuVisible] = useState(false);
  const { isMobile } = useResponsive();
  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);

    if (isMobile) {
      if (!isMenuVisible) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
  };
  const isLoading: boolean | undefined = useAppSelector(
    state => state.categoriesSlice.loading
  );

  const handlePageChange = (_: any, newPage: number) => {
    switchPage(newPage, pagesCount);
  };

  if (!products || !products.length) {
    return (
      <CatalogContainer>
        <CatalogTitleWrapper>
          <BreadcrumbsWrapper>
            <BreadcrumbsList>
              <BreadcrumbLink href={breadcrumbsLinks.slice(0, 1)[0].url}>
                {breadcrumbsLinks.slice(0, 1)[0].name}
              </BreadcrumbLink>
            </BreadcrumbsList>
          </BreadcrumbsWrapper>
        </CatalogTitleWrapper>
        <Notification>{t('productsNotFound')}</Notification>
      </CatalogContainer>
    );
  }

  return (
    <CatalogContainer>
      <CatalogTitleWrapper>
        <Breadcrumbs links={breadcrumbsLinks} />
        <Title as="h1" uppercase>
          {!currentCategory && searchTerm
            ? `${t('phraseSought')}: "${searchTerm}"`
            : currentCategory?.name}
        </Title>
      </CatalogTitleWrapper>
      <CatalogLayout>
        <CatalogFilterBlock visible={isMenuVisible}>
          <>
            {isMenuVisible ? (
              <>
                <FilterNCategoriesHead>
                  <h4>{t('filter')}</h4>
                  <CloseIcon onClick={toggleMenu} />
                </FilterNCategoriesHead>
                {!isMobile ? (
                  <CategoriesMenu
                    switchCategory={switchCategory}
                    selectedCategories={categories}
                    shop={true}
                    isMenuVisible={isMenuVisible}
                  />
                ) : (
                  <>
                    {categories?.length !== 0 ? (
                      <>
                        {isLoading ? (
                          <Skeleton
                            width="100%"
                            height={48}
                            variant="rounded"
                          />
                        ) : (
                          <SelectParentCategory
                            selectedCategories={categories}
                            switchCategory={switchCategory}
                          />
                        )}
                      </>
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
              <>
                {isLoading ? (
                  <Skeleton width="100%" height={48} variant="rounded" />
                ) : (
                  <SelectParentCategory
                    selectedCategories={categories}
                    switchCategory={switchCategory}
                  />
                )}
              </>
            )}
          </>
          {statistic && statistic?.attributes && (
            <>
              <Title as="h3" uppercase textalign="left" marginBottom="24px">
                {t('filters')}
              </Title>
              <FilterPanel
                attributes={statistic?.attributes}
                minPrice={statistic?.min_price || 0}
                maxPrice={statistic?.max_price || 0}
              />
            </>
          )}
        </CatalogFilterBlock>
        <FilterOverlay visible={isMenuVisible} onClick={toggleMenu} />
        <CatalogRightWrapper>
          <CatalogTopWrapper>
            <FilterSortWrapper>
              <FilterWrapper>
                <FilterButton onClick={toggleMenu} />
              </FilterWrapper>
              <CustomSortAccordion />
            </FilterSortWrapper>

            <CountProduct>
              {statistic && statistic?.products_count !== 0 && (
                <>
                  {statistic.products_count}&nbsp;
                  {getPluralForm(statistic.products_count, locale)}
                </>
              )}
            </CountProduct>
            {pagesCount > 1 && (
              <PagesNavigationWrapper>
                <PagesNavigation
                  page={+page}
                  count={pagesCount}
                  siblingCount={0}
                  shape="rounded"
                  hidePrevButton
                  hideNextButton
                  onChange={handlePageChange}
                />
              </PagesNavigationWrapper>
            )}
          </CatalogTopWrapper>
          <CatalogListBlock>
            {products?.length > 0 ? (
              <ProductCardList
                products={products}
                columns={{
                  mobileColumns: 2,
                  tabletColumns: 4,
                  mintabletColumns: 3,
                  desktopColumns: 3,
                }}
              />
            ) : (
              <Notification>{t('productsNotFound')}</Notification>
            )}
          </CatalogListBlock>
          {pagesCount > 1 && (
            <PagesNavigationFooterWrapper>
              <PagesNavigation
                page={+page}
                count={pagesCount}
                siblingCount={0}
                shape="rounded"
                hidePrevButton
                hideNextButton
                onChange={handlePageChange}
              />
            </PagesNavigationFooterWrapper>
          )}
        </CatalogRightWrapper>
      </CatalogLayout>
    </CatalogContainer>
  );
};

export default Archive;
