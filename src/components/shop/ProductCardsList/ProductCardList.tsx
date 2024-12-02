import { FC } from "react";
import ProductCard from "../product/ProductCard/ProductCard";
import { StyledProductCardList } from "./styles";
import { ProductCardListProps } from "@/types/components/shop";
import { ProductCardListSkeleton } from "./ProductCardListSkeleton";

export const ProductCardList: FC<ProductCardListProps> = ({
  isLoading = false,
  isError = false,
  products,
  columns,
  length,
}) => {
  if (isLoading) {
    return <ProductCardListSkeleton columns={columns} length={length} />;
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
        <ProductCard key={product.id} product={product} />
      ))}
    </StyledProductCardList>
  );
};
