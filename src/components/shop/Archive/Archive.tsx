import { CustomSortAccordion } from '@/components/global/accordions/CustomSortAccordion';
import Breadcrumbs from '@/components/global/Breadcrumbs/Breadcrumbs';
import {
  BreadcrumbLink,
  BreadcrumbsList,
  BreadcrumbsWrapper,
} from '@/components/global/Breadcrumbs/styles';
import FilterButton from '@/components/global/buttons/FilterButton/FilterButton';
import CloseIcon from '@/components/global/icons/CloseIcon/CloseIcon';
import Notification from '@/components/global/Notification/Notification';
import MobileCategoriesMenu from '@/components/global/popups/MobileCategoriesMenu/MobileCategoriesMenu';
import { PageTitle } from '@/components/pages/pageTitle';
import CategoriesMenu from '@/components/shop/categories/CategoriesMenu/CategoriesMenu';
import { useCanonicalUrl } from '@/hooks/useCanonicalUrl';
import { useResponsive } from '@/hooks/useResponsive';
import transformCategoriesIntoLinks from '@/services/transformers/transformCategoriesIntoLinks';
import { useAppSelector } from '@/store';
import { PagesNavigation, Title } from '@/styles/components';
import { ArchivePropsType } from '@/types/components/shop/archive';
import { CategoryType } from '@/types/pages/shop';
import { getPluralForm } from '@/utils/getPluralForm';
import { Skeleton } from '@mui/material';
import { useTranslations } from 'next-intl';
import Head from 'next/head';
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

const BASE_URL = 'https://platinumchetvertinovskaya.com';
const languageMap = {
  pl: 'pl-PL',
  en: 'en-US',
  de: 'de-DE',
  uk: 'uk-UA',
  ru: 'ru-RU',
};

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
  const canonicalUrl = useCanonicalUrl();

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
      <>
        <PageTitle title={t('productsNotFound')} />
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
      </>
    );
  }
  // SEO
  const productsTitle =
    currentCategory?.name || `${t('phraseSought')}: "${searchTerm}"`;
  const productDescription = currentCategory?.description || '';

  const structuredDataProductsCategory = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': canonicalUrl,
        url: canonicalUrl,
        name: productsTitle,
        description: productDescription,
        inLanguage: languageMap[locale as keyof typeof languageMap] ?? 'pl-PL',
        isPartOf: {
          '@id': `https://platinumchetvertinovskaya.com/${locale}/#website`,
        },
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: products.map((product, index) => ({
            '@type': 'Product',
            position: index + 1,
            name: product.name,
            url: `${BASE_URL}/${locale}/product/${product.slug}`,
          })),
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbsLinks.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: `${BASE_URL}${item.url}`,
        })),
      },
    ],
  };

  return (
    <>
      <Head>
        <meta name="robots" content="index, follow" />
        <meta name="description" content={productDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredDataProductsCategory),
          }}
        />
        <meta property="og:title" content={productsTitle} />
        <meta property="og:description" content={productDescription} />
        <meta property="og:type" content="product.group" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:locale" content={locale} />
        <meta
          property="og:site_name"
          content="Platinum by Chetvertinovskaya Liubov"
        />
      </Head>
      <PageTitle title={productsTitle} />
      <CatalogContainer>
        <CatalogTitleWrapper>
          <Breadcrumbs links={breadcrumbsLinks} locale={locale} />
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
    </>
  );
};

export default Archive;
