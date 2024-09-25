import { ProductCardList } from "@/components/Shop/ProductCardsList";
import { useGetProductsQuery } from "@/store/rtk-queries/wpCustomApi";
import { TitleCatalog } from "@/styles/components";
import { LangParamType } from "@/types/services/wpCustomApi";
import { ProductType } from "@/types/shop";
import { useRouter } from "next/router";

export default function ProductList() {
    const { locale } = useRouter();
    const langParam: LangParamType | object = locale ? { lang: locale } : {};
    const { data: productsData, isLoading: isProductsLoading } = useGetProductsQuery(langParam);

    const products: ProductType[] = productsData?.data?.items || [];

    return (
        <>
            <TitleCatalog>Product List</TitleCatalog>
            <ProductCardList products={products} columns={{ desktop: 3 }} isLoading={isProductsLoading} />
        </>
    );
}
