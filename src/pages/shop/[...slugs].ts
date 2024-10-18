import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { Archive } from "@/components/shop/Archive";
import axios from "axios";
import wpRestApi from "@/services/wpRestApi";
import wooCommerceRestApi from "@/services/wooCommerceRestApi";
import { ProductParamsType } from "@/types/services";
import { isNumber } from "util";
import { ParsedUrlQuery } from "querystring";
import { getCurrentPageNumber } from "@/utils/getCurrentPageNumber";

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) =>
{
    const { slugs, ...params } = context.query;
    if (!slugs || !Array.isArray(slugs)) return { notFound: true };

    /**  Find pagination params **/
    const pageParam = getCurrentPageNumber(params).toString();

    /** Indicate the products number*/
    const productsPerPage = 11;

    /** Generate product product params */
    const productsParams: ProductParamsType = {
        page: pageParam || undefined,
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