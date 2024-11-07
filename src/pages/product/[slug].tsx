import Breadcrumbs from "@/components/global/Breadcrumbs/Breadcrumbs";
import ProductInfo from "@/components/pages/product/ProductInfo/ProductInfo";
import { useGetProductQuery } from "@/store/rtk-queries/wpCustomApi";
import { Container } from "@/styles/components";
import { ProductType } from "@/types/components/shop/product/products";
import { Box } from "@mui/material";
import Head from "next/head";
import { useEffect } from "react";

export default function ProductPage()
{
    const { data } = useGetProductQuery({ slug: 'uv-eyelash-extension-kit' });
    // chocolate-platinum-20-lines-mix-cc-curl
    const product: ProductType | undefined = data?.data?.item;

    useEffect(() =>
    {
        if (data)
        {
            console.log(data);

        }
    }, [data])

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