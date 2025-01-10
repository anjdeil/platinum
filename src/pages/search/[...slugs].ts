import { Archive } from "@/components/shop/Archive";
import { customRestApi } from "@/services/wpCustomApi";
import { ProductType } from "@/types/pages/shop";
import { ProductParamsType } from "@/types/services";
import { findPageParam } from "@/utils/getCurrentPageNumber";
import { sanitizeSearchParams } from "@/utils/sanitizeSearchParams";
import { validateWpCustomProductsData } from "@/utils/zodValidators/validateWpCustomProductsData";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

export const getServerSideProps: GetServerSideProps = async ({
  query,
  locale,
}: GetServerSidePropsContext) => {
  try {
    const { slugs, ...params } = query;
    if (slugs === undefined || !Array.isArray(slugs))
      return {
        notFound: true,
      };

    /**
     * Find pagination param:
     */
    const page = findPageParam(slugs);
    if (!page) return { notFound: true };

    const pageIndex = slugs.indexOf("page");
    const searchTerm = slugs[0];

    /** Redirect with saving params:
     * if the page params < 0
     * if the page params equals 1
     */
    if (pageIndex !== -1 && (page === "1" || page === "0")) {
      const newPath = slugs.slice(0, pageIndex).join("/");
      const searchParamsString = sanitizeSearchParams(params);
      return {
        redirect: {
          destination: `${locale === "en" ? "" : `/${locale}`}/search/${newPath}${searchParamsString ? `?${searchParamsString}` : ""
            }`,
          permanent: false,
        },
      };
    }

    /**
     * Indicate the products number
     */
    const productsPerPage = 21;

    /**
     * Products:
     *
     * Generate product product params
     */
    const productsParams: ProductParamsType = {
      page: page || "1",
      per_page: productsPerPage,
      lang: locale,
      search: searchTerm,
      ...params,
    };

    const response = await customRestApi.get("products", productsParams);

    const validatedProductsData = validateWpCustomProductsData(response.data);

    let products: ProductType[] = [];
    let pagesCount = 0;

    if (validatedProductsData) {
      products = validatedProductsData.data.items;
      const productsCount = validatedProductsData.data.statistic?.products_count;
      pagesCount = Math.ceil(productsCount / productsPerPage);
    }

    /* Do not open if pagination page number is more than pages count */
    if (pagesCount !== 0 && +page > pagesCount)
      return {
        notFound: true,
      };

    return {
      props: {
        products,
        pagesCount,
        page,
        searchTerm,
        locale,
        statistic: validatedProductsData?.data.statistic || null,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        error: {
          message: "Server Error",
        },
      },
    };
  }
};

export default Archive;
