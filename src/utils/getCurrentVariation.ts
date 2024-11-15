import { ProductVariationType } from "@/types/components/shop/product/products";

interface CurrentAttributesType
{
    [key: string]: string | string[] | undefined;
}

export function getCurrentVariation(variations: ProductVariationType[], currentAttributes: CurrentAttributesType): ProductVariationType | undefined
{
    return variations.find(variation =>
        variation.attributes.every(attr =>
            currentAttributes[attr.slug] === attr.option
        )
    );
}