import { ProductCardListProps } from "@/types/shop/ProductsList";
import { FC } from "react";
import ProductCard from "../ProductCard/ProductCard";
import { ProductCardListSkeleton } from "../ProductCardListSkeleton";
import { StyledProductCardList } from "./styles";

export const ProductCardList: FC<ProductCardListProps> = ({ isLoading = false, isError = false, products, columns }) => {
    if (isLoading) {
        return <ProductCardListSkeleton columns={columns} />;
    }

    if (isError) {
        return <p>We cannot get the products</p>;
    }

    return (
        <StyledProductCardList
            mobileColumns={columns?.mobileColumns}
            tabletColumns={columns?.tabletColumns}
            desktopColumns={columns?.desktopColumns}
        >
            {products?.map((product, i) => (
                <ProductCard
                    key={product.id}
                    product={product}
                />
            ))}
        </StyledProductCardList>
    );
}
