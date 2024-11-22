import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { Archive } from "@/components/shop/Archive";
import { LangParamType, ProductParamsType } from "@/types/services";
import { findPageParam } from "@/utils/getCurrentPageNumber";
import { customRestApi } from "@/services/wpCustomApi";
import { ProductType } from "@/types/pages/shop";
import { validateWpCustomProductsData } from "@/utils/zodValidators/validateWpCustomProductsData";

function findCategoryParam(slugs: string[]): string[] {
  return slugs.filter((slug) => slug !== "page" && !/^\d+$/.test(slug));
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { locale } = context;

  const { slugs, ...params } = context.query;

  console.log("Initial slugs:", slugs);

  if (!slugs || !Array.isArray(slugs)) {
    console.log("slugs is not an array or does not exist");
    return { notFound: true };
  }

  const page = findPageParam(slugs);

  if (!page) return { notFound: true };

  const categorySlugs = findCategoryParam(slugs);
  console.log("Category Slugs:", categorySlugs);

  if (categorySlugs && categorySlugs.length > 2) {
    console.log("Too many category slugs");
    return { notFound: true };
  }

  if (categorySlugs && categorySlugs.length === 0) {
    console.log("No category slugs found");
    return { notFound: true };
  }

  if (page === "1" || page === "0") {
    const pageIndex = slugs.indexOf("page");
    if (pageIndex !== -1) {
      const newPath = slugs.slice(0, pageIndex).join("/");
      console.log("Redirecting to:", `/product-category/${newPath}`);
      return {
        redirect: {
          destination: `/product-category/${newPath}`,
          permanent: false,
        },
      };
    }
  }

  /** Indicate the products number*/
  const productsPerPage = 11;
  const minPrice = params.min_price ? Number(params.min_price) : null;
  const maxPrice = params.max_price ? Number(params.max_price) : null;

  // language slug
  let languageSlug = locale || "";

  const allowedLanguages = ["de", "en", "pl", "ru", "uk"];

  if (!allowedLanguages.includes(languageSlug)) {
    languageSlug = "";
  }

  const productsParams: ProductParamsType = {
    page: page || "1",
    per_page: productsPerPage,
    category: categorySlugs[categorySlugs?.length - 1],
    ...params,
    ...(minPrice && { min_price: minPrice }),
    ...(maxPrice && { max_price: maxPrice }),
    // order_by string
    // order_by string
    lang: languageSlug,
    // ids array[string]
    // slugs array[string]
    // category string
    min_price: "10",
    max_price: "200",
    // search  string
  };

  console.log("Products Params:", productsParams);

  try {
    const response = await customRestApi.get("products", productsParams);
    const validatedData = validateWpCustomProductsData(response.data);
    let products: ProductType[] = [];
    let pagesCount = 0;
    if (validatedData) {
      products = validatedData.data.items;
      const productsCount = validatedData.data.statistic?.products_count;
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
        categoriesSlugs: categorySlugs,
        statistic: validatedData?.data.statistic,
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
