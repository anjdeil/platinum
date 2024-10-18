import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { Archive } from "@/components/shop/Archive";
import wooCommerceRestApi from "@/services/wooCommerceRestApi";
import { ProductParamsType } from "@/types/services";
import { findPageParam } from "@/utils/getCurrentPageNumber";

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) =>
{
    const { slugs, ...params } = context.query;
    if (!slugs || !Array.isArray(slugs)) return { notFound: true };

    /**  Find pagination params **/
    // const pageParam = getCurrentPageNumber(params).toString();

    /** Find pagination param: */
    const page = findPageParam(slugs);
    console.log('custom page', slugs);
    if (page) return { notFound: true };

    /** Indicate the products number*/
    const productsPerPage = 11;

    /** Generate product product params */
    const productsParams: ProductParamsType = {
        page: page || undefined,
        per_page: productsPerPage,
    }

    try
    {
        const response = await wooCommerceRestApi.get('products', productsParams);
        const products = response?.data || [];

        return {
            props: {
                products,
                params
            },
        }
    } catch (error)
    {
        console.error(error);
        return {
            props: {
                error
            },
        }
    }


};

export default Archive;