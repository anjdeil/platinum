import { VariationTitle } from "@/styles/components";
import { ColorVariationsProps } from "@/types/components/shop/product/productVariations";
import { useTranslations } from "next-intl";
import React from "react";
import { ColorVariationsContainer, VariationListBlock, VariationsColorButton } from "./styles";

const ColorVariations: React.FC<ColorVariationsProps> = ({ list, currentVariation, onChange }) =>
{
    const t = useTranslations("Product");

    return (
        <ColorVariationsContainer>
            <VariationTitle>
                {t('color')}
            </VariationTitle>
            <VariationListBlock>
                {list.map((item) => (
                    <VariationsColorButton
                        key={item}
                        active={item === currentVariation}
                        onClick={() => onChange(item)}
                        color={item}
                    >
                    </VariationsColorButton>
                ))}
            </VariationListBlock>
        </ColorVariationsContainer >           
    );
};

export default ColorVariations;