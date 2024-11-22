import Breadcrumbs from "@/components/global/Breadcrumbs/Breadcrumbs";
import CustomProductList from "@/components/pages/product/CustomProductList/CustomProductList";
import ProductInfo from "@/components/pages/product/ProductInfo/ProductInfo";
import { customRestApi } from "@/services/wpCustomApi";
import { Container } from "@/styles/components";
import { BreadcrumbType } from "@/types/components/global/breadcrumbs";
import { ProductPageType } from "@/types/pages/product";
import { validateCustomSingleProduct } from "@/utils/zodValidators/validateCustomSingleProduct";
import { Box } from "@mui/material";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Head from "next/head";
import { useEffect, useMemo, useState } from "react";

// vinyl-gloves/
// https://platinum.digiway-dev.online/wp-admin/edit.php?post_type=product&page=product_attributes

/**
 * Get all attributes - done
 * Display options depending on attributes - done
 * Default attributes
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

export default function ProductPage({ res }: ProductPageType) {
    const product = useMemo(() => res.data.item, [res]);
    const [breadcrumbsLinks, setBreadcrumbsLinks] = useState<BreadcrumbType[]>([]);

    useEffect(() => {
        const links = product.categories.map(item => ({
            name: item.name,
            url: `product-category/${item.name}`
        }));
        links.push({ name: product.name, url: '/' });
        setBreadcrumbsLinks(links);
    }, [product.categories]);

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
                    <Breadcrumbs links={breadcrumbsLinks} />
                </Box>
                {product && <ProductInfo product={product} />}
                <CustomProductList title="recommendProduct" productIds={recommendProducts} />
            </Container>
        </>
    );
}

const recommendProducts = [
    24707,
    24777,
    24737,
    24717,
];

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    const { slug } = context.query;

    try {
        if (typeof slug !== "string") throw new Error("Invalid product slug");

        const response = await customRestApi.get(`products/${slug}`);

        const isValid = await validateCustomSingleProduct(response.data);
        if (!isValid) throw new Error("Invalid product data");

        return {
            props: {
                res: response.data,
            },
        }
    } catch (err) {
        console.error("Failed to fetch product data:", err);
        return {
            notFound: true,
        };
    }
};
