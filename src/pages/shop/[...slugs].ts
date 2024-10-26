import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { Archive } from "@/components/shop/Archive";
import { CustomDataProductsSchema, CustomDataProductsType, ProductParamsType } from "@/types/services";
import { findPageParam } from "@/utils/getCurrentPageNumber";
import { customRestApi } from "@/services/wpCustomApi";
import { ProductType } from "@/types/pages/shop";
import { validateWpCustomCategoriesData } from "@/utils/zodValidators/validateWpCustomCategoriesData";
import CategoryType from "@/types/pages/shop/categories";
import { validateWpCustomProductsData } from "@/utils/zodValidators/validateWpCustomProductsData copy";

function findCategoryParam(slugs: string[]): string | null {
    const categorySlugIndex = slugs.findIndex((slug: string) => slug === 'category');
    if (categorySlugIndex >= 0 && slugs[categorySlugIndex + 1]) {
        return slugs[categorySlugIndex + 1];
    }
    return null;
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    const { slugs, ...params } = context.query;
    if (!slugs || !Array.isArray(slugs)) return { notFound: true };

    /** Найти параметр пагинации: */
    const page = findPageParam(slugs);

    /** Найти параметр категории: */
    const category = findCategoryParam(slugs);

    if (!page) return { notFound: true };

    if (page === '1' || page === '0') {
        const pageIndex = slugs.indexOf('page');
        if (pageIndex !== -1) {
            const newPath = slugs.slice(0, pageIndex).join('/');
            return {
                redirect: {
                    destination: `/shop/${newPath}`,
                    permanent: false,
                },
            };
        }
    }

    /** Указать количество продуктов */
    const productsPerPage = 11;

    /** Создать параметры для запроса продуктов */
    const productsParams: ProductParamsType = {
        page: page || "1",
        per_page: productsPerPage,
        category: category || '',
        // order_by string
        // order_by string
        // lang string
        // ids array[string]
        // slugs array[string]
        // category string
        // min_price number
        // max_price number
        // search  string
    }

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

        /* Не открывать, если номер страницы пагинации больше количества страниц */
        if (pagesCount !== 0 && +page > pagesCount) return { notFound: true };

        /** Получить данные категорий */
        const categoriesResponse = await customRestApi.get('categories', {});
        const validatedCategoriesData = validateWpCustomCategoriesData(categoriesResponse.data);

        let categories: CategoryType[] = [];

        if (validatedCategoriesData) {
            categories = validatedCategoriesData.data.items;
        }

        // Фильтруем категории, чтобы включить только выбранную категорию
        const selectedCategory = categories.find(cat => cat.slug === category);

        return {
            props: {
                products,
                pagesCount,
                page,
                categories: selectedCategory ? [selectedCategory] : [],
            },
        }

    } catch (error) {
        console.error(error);
        return {
            props: {
                error: {
                    message: error,
                    // status: error.response ? error.response.status : 500,
                },
            },
        }
    }
};

export default Archive;
