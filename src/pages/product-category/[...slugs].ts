import { Archive } from "@/components/shop/Archive";
import { customRestApi } from "@/services/wpCustomApi";
import { ProductType } from "@/types/pages/shop";
import { ProductParamsType } from "@/types/services";
import { findPageParam } from "@/utils/getCurrentPageNumber";
import { sanitizeSearchParams } from "@/utils/sanitizeSearchParams";
import { validateWpCustomProductsData } from "@/utils/zodValidators/validateWpCustomProductsData";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

export const getServerSideProps: GetServerSideProps = async ({ query }: GetServerSidePropsContext) => {
    const { slugs, ...params } = query;
    if (slugs === undefined || !Array.isArray(slugs)) return {
        notFound: true
    };

    /** 
     * Find pagination param: 
     */
    const page = findPageParam(slugs);

    /** Redirect:
     * if the page params < 0
     * if the page params equals 1
     */
    if (!page) return { notFound: true };

    const searchParamsString = sanitizeSearchParams(params);

    if (page === '1' || page === '0') {
        const pageIndex = slugs.indexOf('page');

        if (pageIndex !== -1) {
            const newPath = slugs.slice(0, pageIndex).join('/');
            return {
                redirect: {
                    destination: `/product-category/${newPath}${searchParamsString ? `?${searchParamsString}` : ''}`,
                    permanent: false,

                },
            };
        }
    }

    /**
     * Indicate the products number 
     */
    const productsPerPage = 21;

    /** 
     * Generate product product params 
     */
    const productsParams: ProductParamsType = {
        page: page || "1",
        per_page: productsPerPage,
        ...params,
        // order_by string
        // order_by string
        // lang string
        // ids array[string]
        // slugs array[string]
        // category string
        // search  string
    };

    try {
        const response = await customRestApi.get('products', productsParams);
        const validatedData = validateWpCustomProductsData(response.data);
        let products: ProductType[] = [];
        let pagesCount = 0;
        if (validatedData) {
            products = validatedData.data.items;
            const productsCount = validatedData.data.statistic?.products_count;
            pagesCount = Math.ceil(productsCount / productsPerPage);
        }

        /* Do not open if pagination page number is more than pages count */
        if (pagesCount !== 0 && +page > pagesCount) return {
            notFound: true
        }

        return {
            props: {
                products,
                pagesCount,
                page,
                statistic: validatedData?.data.statistic,
            },
        }

    } catch (error) {
        console.error(error);
        return {
            props: {
                error: {
                    message: 'Server Error',
                },
            },
        }
    }
};

export default Archive;