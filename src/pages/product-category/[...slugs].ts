import { Archive } from '@/components/shop/Archive'
import { customRestApi } from '@/services/wpCustomApi'
import CategoryType from '@/types/components/shop/categories/categories'

import { ProductType } from '@/types/pages/shop'
import { CustomDataCategoriesType, ProductParamsType } from '@/types/services'
import { findPageParam } from '@/utils/getCurrentPageNumber'
import { sanitizeSearchParams } from '@/utils/sanitizeSearchParams'
import { validateWpCustomProductsData } from '@/utils/zodValidators/validateWpCustomProductsData'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'

export const getServerSideProps: GetServerSideProps = async ({
  query,
  locale,
}: GetServerSidePropsContext) => {
  try {
    const { slugs, ...params } = query
    if (slugs === undefined || !Array.isArray(slugs))
      return {
        notFound: true,
      }

    /**
     * Find pagination param:
     */
    const page = findPageParam(slugs)
    if (!page) return { notFound: true }

    const pageIndex = slugs.indexOf('page')

    /** Redirect with saving params:
     * if the page params < 0
     * if the page params equals 1
     */
    if (pageIndex !== -1 && (page === '1' || page === '0')) {
      const newPath = slugs.slice(0, pageIndex).join('/')
      const searchParamsString = sanitizeSearchParams(params)
      return {
        redirect: {
          destination: `${
            locale === 'en' ? '' : `/${locale}`
          }/product-category/${newPath}${
            searchParamsString ? `?${searchParamsString}` : ''
          }`,
          permanent: false,
        },
      }
    }

    /**
     * Indicate the products number
     */
    const productsPerPage = 21

    /** Categories:
     *
     * Find categories param
     */
    const lastCategorySlugIndex = pageIndex >= 0 ? pageIndex : slugs.length
    const categorySlugs = slugs.slice(0, lastCategorySlugIndex)

    /* Сannot be more than two categories */
    if (categorySlugs[2])
      return {
        notFound: true,
      }

    /* Fetch categories */
    const categoriesResponseData = await customRestApi.get(`categories`, {
      slugs: categorySlugs.join(','),
      lang: locale,
    })
    const categoriesResponse = categoriesResponseData?.data as CustomDataCategoriesType
    let categories =
      categoriesResponse?.data && (categoriesResponse.data.items as CategoryType[])

    /* Filter only current lang results */
    categories = categories.filter(({ language_code }) => language_code === locale)

    /* Return 404 if the categories not found */
    if (!categories?.length)
      return {
        notFound: true,
      }

    /* Return 404 if the categories in the response are less than the requested categories */
    if (categories.length < categorySlugs.length)
      return {
        notFound: true,
      }

    /* Sort categories */
    categories.sort((a, b) => a.parent_id - b.parent_id)

    /* Do not open a subcategory without a parent category */
    if (categories[0].parent_id !== 0)
      return {
        notFound: true,
      }

    /* Check if the second category is the child of the first category */
    if (categories[1] && categories[1].parent_id !== categories[0].id)
      return {
        notFound: true,
      }

    /**
     * Products:
     *
     * Generate product product params
     */
    const productsParams: ProductParamsType = {
      page: page || '1',
      per_page: productsPerPage,
      lang: locale,
      category: categorySlugs[categorySlugs.length - 1],
      ...params,
    }

    const response = await customRestApi.get('products', productsParams)

    const validatedProductsData = validateWpCustomProductsData(response.data)

    let products: ProductType[] = []
    let pagesCount = 0

    if (validatedProductsData) {
      products = validatedProductsData.data.items
      const productsCount = validatedProductsData.data.statistic?.products_count
      pagesCount = Math.ceil(productsCount / productsPerPage)
    }

    /* Do not open if pagination page number is more than pages count */
    if (pagesCount !== 0 && +page > pagesCount)
      return {
        notFound: true,
      }

    return {
      props: {
        products,
        pagesCount,
        page,
        categories,
        locale,
        statistic: validatedProductsData?.data.statistic,
      },
    }
  } catch (error) {
    console.error(error)
    return {
      props: {
        error: {
          message: 'Server Error',
        },
      },
    }
  }
}

export default Archive
