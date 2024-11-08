import Breadcrumbs from "@/components/global/Breadcrumbs/Breadcrumbs";
import CustomProductList from "@/components/pages/product/CustomProductList/CustomProductList";
import ProductInfo from "@/components/pages/product/ProductInfo/ProductInfo";
import { useGetProductQuery } from "@/store/rtk-queries/wpCustomApi";
import { Container } from "@/styles/components";
import { ProductType } from "@/types/components/shop/product/products";
import { Box } from "@mui/material";
import { useEffect } from "react";

export default function ProductPage()
{
    const { data } = useGetProductQuery({ slug: 'premium-memory-foam-cosmetic-mattress-for-tm-platinum-eyelash-extensions-3' });

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
            <CustomProductList title="recommendProduct" productIds={recommendProducts} />
        </Container>
    );
}

const recommendProducts = [
  24707,
  24777,
  24737,
  24717,
];