import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { Archive } from "@/components/shop/Archive";
import { CustomDataProductsSchema, CustomDataProductsType, ProductParamsType } from "@/types/services";
import { findPageParam } from "@/utils/getCurrentPageNumber";
import { customRestApi } from "@/services/wpCustomApi";
import { ProductType } from "@/types/pages/shop";
import { validateWpCustomCategoriesData, validateWpCustomCategoryData } from "@/utils/zodValidators/validateWpCustomCategoriesData";
import CategoryType, { CategorySchema } from "@/types/pages/shop/categories";
import { validateWpCustomProductsData } from "@/utils/zodValidators/validateWpCustomProductsData";

function findCategoryParam(slugs: string[]): string[] | null
{
    return slugs.filter(slug => slug !== 'page' && !/^\d+$/.test(slug));
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) =>
{
    const { slugs, ...params } = context.query;

    if (!slugs || !Array.isArray(slugs)) return { notFound: true };

    const page = findPageParam(slugs);

    const categorySlugs = findCategoryParam(slugs);

    if (categorySlugs && categorySlugs.length > 2) return { notFound: true };

    if (!page) return { notFound: true };

    if (page === '1' || page === '0')
    {
        const pageIndex = slugs.indexOf('page');
        if (pageIndex !== -1)
        {
            const newPath = slugs.slice(0, pageIndex).join('/');
            return {
                redirect: {
                    destination: `/product-category/${newPath}`,
                    permanent: false,
                },
            };
        }
    }

    let selectedCategories: CategoryType[] = [];

    if (categorySlugs)
    {
        const categoryPromises = categorySlugs.map(async (category) =>
        {
            const categoryResponse = await customRestApi.get(`categories/${category}`, {
                lang: 'en'
            });

            const validatedCategoryData = validateWpCustomCategoryData(categoryResponse.data);

            if (validatedCategoryData)
            {
                selectedCategories.push(validatedCategoryData.data.item);
            } else
            {
                console.error('Validation failed for category data:', categoryResponse);
            }
        });

        await Promise.all(categoryPromises);

        if (selectedCategories.length < categorySlugs.length)
        {
            console.error('Not all categories found:', selectedCategories);
            return { notFound: true };
        }

        selectedCategories.sort((a, b) => a.parent_id - b.parent_id);
        if (selectedCategories[0].parent_id !== 0)
        {
            console.error('First category is not a root category:', selectedCategories[0]);
            return { notFound: true };
        }
        if (selectedCategories[1] && selectedCategories[1].parent_id !== selectedCategories[0].id)
        {
            console.error('Second category does not belong to the first category:', selectedCategories[1]);
            return { notFound: true };
        }
    } else
    {
        console.log('No category slugs found.');
    }

    /** Indicate the products number*/
    const productsPerPage = 11;
    const minPrice = params.min_price ? Number(params.min_price) : null;
    const maxPrice = params.max_price ? Number(params.max_price) : null;

    console.log('sss', selectedCategories[selectedCategories.length - 1].slug);

    const productsParams: ProductParamsType = {
        page: page || "1",
        per_page: productsPerPage,
        category: selectedCategories.length ? selectedCategories[selectedCategories.length - 1].slug : '',
        subCategory: selectedCategories.length > 1 ? selectedCategories[selectedCategories.length - 2].slug : '',
        ...params,
        ...(minPrice && { min_price: minPrice }),
        ...(maxPrice && { max_price: maxPrice }),
        // order_by string
        // order_by string
        // lang string
        // ids array[string]
        // slugs array[string]
        // category string
        min_price: '10',
        max_price: '200'
        // search  string
    }

    try
    {
        const response = await customRestApi.get('products', productsParams);
        const validatedData = validateWpCustomProductsData(response.data);
        let products: ProductType[] = [];
        let pagesCount = 0;
        if (validatedData)
        {
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
                categories: selectedCategories,
                statistic: validatedData?.data.statistic
            },
        }

    } catch (error)
    {
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
