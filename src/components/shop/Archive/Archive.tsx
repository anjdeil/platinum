import { CustomSortAccordion } from '@/components/global/accordions/CustomSortAccordion'
import Breadcrumbs from '@/components/global/Breadcrumbs/Breadcrumbs'
import FilterButton from '@/components/global/buttons/FilterButton/FilterButton'
import { PagesNavigation, Title } from '@/styles/components'
import { ArchivePropsType } from '@/types/components/shop/archive'
import router from 'next/router'
import { FC } from 'react'
import { FilterPanel } from '../filtration/FilterPanel'
import { ProductCardList } from '../ProductCardsList'
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
  PagesNavifationWrapper,
} from './styles'
import SideList from '@/components/global/SideList/SideList'
import transformCategoriesIntoLinks from '@/services/transformers/transformCategoriesIntoLinks'
import { useTranslations } from 'next-intl'

import { useGetCategoriesQuery } from '@/store/rtk-queries/wpCustomApi'
import transformSubcategoriesIntoLinks from '@/services/transformers/transformSubcategoriesIntoLinks'
import CategoryType from '@/types/components/shop/categories/categories'

const switchPage = (page: number, maxPage: number) => {
  if (maxPage < page) return
  const { slugs, ...params } = router.query
  if (!Array.isArray(slugs)) return

  const newSlugs = slugs.filter((slug) => slug !== 'page' && Number.isNaN(+slug))
  newSlugs.push('page', String(page))

  router.push({
    pathname: router.pathname,
    query: {
      slugs: newSlugs,
      ...params,
    },
  })
}

export const Archive: FC<ArchivePropsType> = (props) => {
  const { products, categories, pagesCount, page, statistic, locale } = props

  const t = useTranslations('Archive')

  const currentCategory = Array.isArray(categories)
    ? (categories[categories.length - 1] as CategoryType)
    : null

  /**
   * Formulate categories links for breadcrumbs
   */
  const categoriesBreadcrumbsLinks = transformCategoriesIntoLinks(categories || [])
  const breadcrumbsLinks = [
    {
      name: t('goHome'),
      url: locale === 'en' ? '/' : `/${locale}`,
    },
    ...categoriesBreadcrumbsLinks,
  ]

  /**
   * Formulate subcategories links for sidebar
   */
  const { data: allCategoriesData } = useGetCategoriesQuery({ lang: locale })
  const allCategories = allCategoriesData?.data?.items

  const parentCategoryId = currentCategory?.parent_id
    ? currentCategory.parent_id
    : currentCategory?.id
  const parentCategory = allCategories?.find(({ id }) => id === parentCategoryId)
  const parentCategorySlug = parentCategory?.parent_id === 0 ? parentCategory?.slug : null

  const subcategories = allCategories?.filter(
    ({ parent_id }) => parent_id === parentCategoryId
  )
  const subcategoriesLinks = transformSubcategoriesIntoLinks(
    subcategories || [],
    parentCategorySlug,
    currentCategory?.id
  )

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
          {Boolean(subcategoriesLinks?.length) && (
            <>
              <Title as="h3" uppercase textalign="left" marginBottom="24px">
                Categories
              </Title>
              <SideList
                links={subcategoriesLinks}
                marginTop="15px"
                marginBottom="76px"
                mobFontSize="12px"
                mobLineHeight="16px"
              />
            </>
          )}
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
            <PagesNavifationWrapper>
              <PagesNavigation
                page={+page}
                count={pagesCount}
                siblingCount={1}
                shape="rounded"
                hidePrevButton
                hideNextButton
                onChange={(_, newPage) => {
                  switchPage(newPage, pagesCount)
                }}
              />
            </PagesNavifationWrapper>
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
  )
}
