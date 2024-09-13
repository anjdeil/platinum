//@ts-nocheck
import { ProductCardList } from "@/components/Shop/ProductCardsList";
import { useGetProductQuery } from "@/store/rtk-queries/wpCustomApi";
import { LangParamType } from "@/types/services/wpCustomApi";
import { ProductType } from "@/types/shop";
import { useRouter } from "next/router";

export default function ProductList() {
    const { locale } = useRouter();
    const langParam: LangParamType | object = locale ? { lang: locale } : {};
    const { data: productsData, isLoading: isProductsLoading } = useGetProductQuery(langParam);

    const products: ProductType[] = productsData?.data?.items || [];

    return (
        <>
            <h2>Product List</h2>
            {isProductsLoading ?
                <p>Loading...</p> : (
                    <ProductCardList products={products} columns={{ desktop: 3 }} isloading={isProductsLoading} />
            )}
        </>
    );
}
