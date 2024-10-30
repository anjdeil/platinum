import Breadcrumbs from "@/components/global/Breadcrumbs/Breadcrumbs";
import ProductInfo from "@/components/pages/product/ProductInfo/ProductInfo";
import RecommendProducts from "@/components/pages/product/RecommendProducts/RecommendProducts";
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
            <RecommendProducts products={recommendProducts} />
        </Container>
    );
}

const recommendProducts: ProductType[] = [
  {
    id: 1,
    sku: "ABC123",
    slug: "product-1",
    name: "Test Product 1",
    description: "Description for test product 1",
    type: "physical",
    created: "2024-01-01T12:00:00Z",
    modified: "2024-01-02T12:00:00Z",
    language_code: "en",
    stock_quantity: 100,
    min_price: 19.99,
    max_price: 29.99,
    categories: [
      {
        id: 1,
        parent_id: 0,
        slug: "category-1",
        name: "Category 1",
        description: "Description for Category 1",
        count: 10,
      },
    ],
    images: [{ id: 1, src: "image1.jpg", name: "Image 1" }],
    attributes: [],
    default_attributes: [],
    variations: [],
  },
  {
    id: 2,
    sku: null,
    slug: "product-2",
    name: "Test Product 2",
    description: "Description for test product 2",
    type: "digital",
    created: "2024-02-01T12:00:00Z",
    modified: "2024-02-02T12:00:00Z",
    language_code: "en",
    stock_quantity: null,
    min_price: 9.99,
    max_price: 15.99,
    categories: [
      {
        id: 2,
        parent_id: 0,
        slug: "category-2",
        name: "Category 2",
        description: "Description for Category 2",
        count: 20,
      },
    ],
    images: [{ id: 2, src: "image2.jpg", name: "Image 2" }],
    attributes: [],
    default_attributes: [],
    variations: [],
  },
  {
    id: 3,
    sku: "XYZ789",
    slug: "product-3",
    name: "Test Product 3",
    description: "Description for test product 3",
    type: "physical",
    created: "2024-03-01T12:00:00Z",
    modified: "2024-03-02T12:00:00Z",
    language_code: "fr",
    stock_quantity: 50,
    min_price: 39.99,
    max_price: 49.99,
    categories: [
      {
        id: 3,
        parent_id: 1,
        slug: "category-3",
        name: "Category 3",
        description: "Description for Category 3",
        count: 15,
      },
    ],
    images: [{ id: 3, src: "image3.jpg", name: "Image 3" }],
    attributes: [],
    default_attributes: [],
    variations: [],
  },
  {
    id: 4,
    sku: "LMN456",
    slug: "product-4",
    name: "Test Product 4",
    description: "Description for test product 4",
    type: "service",
    created: "2024-04-01T12:00:00Z",
    modified: "2024-04-02T12:00:00Z",
    language_code: "es",
    stock_quantity: null,
    min_price: 59.99,
    max_price: 69.99,
    categories: [
      {
        id: 4,
        parent_id: 1,
        slug: "category-4",
        name: "Category 4",
        description: "Description for Category 4",
        count: 8,
      },
    ],
    images: [{ id: 4, src: "image4.jpg", name: "Image 4" }],
    attributes: [],
    default_attributes: [],
    variations: [],
  },
];