import { VariationTitle } from "@/styles/components";
import { ProductVariationsProps } from "@/types/components/shop/product/productVariations";
import React from "react";
import { ProductVariationsContainer, VariationListBlock, VariationsButton } from "./styles";

const ProductVariations: React.FC<ProductVariationsProps> = ({ title, list, currentVariation, onChange }) =>
{
    return (
        <ProductVariationsContainer>
            <VariationTitle>
                {title}
            </VariationTitle>
            <VariationListBlock>
                {list.map((item) => (
                    <VariationsButton
                        key={item}
                        active={item === currentVariation}
                        onClick={() => onChange(item)}
                    >
                        {item}
                    </VariationsButton>
                ))}
            </VariationListBlock>
        </ProductVariationsContainer >           
    );
};

export default ProductVariations;