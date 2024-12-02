import { VariationTitle } from "@/styles/components";
import { ColorVariationsProps } from "@/types/components/shop/product/productVariations";
import { useTranslations } from "next-intl";
import React from "react";
import { ColorVariationsContainer, VariationListBlock, VariationsColorButton } from "./styles";

const ColorVariations: React.FC<ColorVariationsProps> = ({ attr, currentVariation, onChange }) =>
{
    const t = useTranslations("Product");

    return (
        <ColorVariationsContainer>
            <VariationTitle>
                {t('color')}
            </VariationTitle>
            <VariationListBlock>
                {attr.options && attr.options.map((item) => (
                    <VariationsColorButton
                        key={item.slug}
                        active={item.slug === currentVariation}
                        onClick={() => onChange(attr.slug, item.slug)}
                        color={item.slug}
                    >
                    </VariationsColorButton>
                ))}
            </VariationListBlock>
        </ColorVariationsContainer >
    );
};

export default ColorVariations;