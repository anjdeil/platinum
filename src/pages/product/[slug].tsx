import Breadcrumbs from "@/components/global/Breadcrumbs/Breadcrumbs";
import Reviews from "@/components/global/reviews/Reviews/Reviews";
import ProductInfo from "@/components/pages/product/ProductInfo/ProductInfo";
import { useGetProductQuery } from "@/store/rtk-queries/wpCustomApi";
import { Container } from "@/styles/components";
import { ProductType } from "@/types/pages/shop";
import { Box } from "@mui/material";
import { useEffect } from "react";

export default function ProductPage()
{
    // const { data } = useGetProductQuery({ slug: 'premium-memory-foam-cosmetic-mattress-for-tm-platinum-eyelash-extensions-3' });
    const { data } = useGetProductQuery({ slug: 'silicone-patches-black' });

    const product: ProductType | undefined = data?.data?.item;

    useEffect(() =>
    {
        if (data)
        {
            console.log(data);

        }
    }, [data])

    return (
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
            {product && <Reviews product={product} />}
        </Container>
    );
}
