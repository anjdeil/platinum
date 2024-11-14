import Breadcrumbs from "@/components/global/Breadcrumbs/Breadcrumbs";
import ProductInfo from "@/components/pages/product/ProductInfo/ProductInfo";
import { customRestApi } from "@/services/wpCustomApi";
import { useGetProductQuery } from "@/store/rtk-queries/wpCustomApi";
import { Container } from "@/styles/components";
import { ProductType } from "@/types/components/shop/product/products";
import { Box } from "@mui/material";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Head from "next/head";
import { useEffect } from "react";

// vinyl-gloves/
// https://platinum.digiway-dev.online/wp-admin/edit.php?post_type=product&page=product_attributes

/**
 * Get all attributes - done
 * Display options depending on attributes - done
 * Change data depending on attributes
 * Synchronize other attributes
 * Get current variations
 * Change params of variations
 * Check other layouts elements
 */

// Colors
// Array
// Slug as title
// Options as options


// Map or Set for current variation
// Variations FOR attributes FOR check slug and option
export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) =>
{
    const { slug } = context.query;

    try
    {
        if (typeof slug !== "string")
        {
            throw new Error("Invalid product slug");
        }

        const response = await customRestApi.get(`products/${slug}`);

        if (!response.data || !response.data.data.item)
        {
            throw new Error("Product not found");
        }

        return {
            props: {
                product: response.data.data.item,
            },
        };
    } catch (err)
    {
        console.error("Failed to fetch product data:", err);
        return {
            notFound: true,
        };
    }
};

export default function ProductPage({ product })
{
    // const product: ProductType | undefined = data?.data?.item;

    return (
        <>
            <Head>
                <title>{'Place for title'}</title>
                {<meta name="description" content={'Place for seo description'} />}
                <link rel="canonical" href={'Place for seo canonical'} />
                {<script type="application/ld+json">{JSON.stringify('Place for schema')}</script>}
            </Head>
            <Container>
                <Box sx={{ display: 'flex', justifyContent: 'flex-start', marginTop: '24px' }}>
                    <Breadcrumbs
                        links={[
                            { name: 'ALL SHOP', url: '/' },
                            { name: 'EYELASH', url: '/' },
                            { name: 'NEW System UV', url: '/' }
                        ]}
                    />
                </Box>
                {product && <ProductInfo product={product} />}
            </Container>
        </>
    );
}