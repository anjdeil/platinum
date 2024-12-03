import { ProductVariation } from "@/types/pages/shop";

interface CurrentAttributesType {
    [key: string]: string | string[] | undefined;
}

export function getCurrentVariation(variations: ProductVariation[], currentAttributes: CurrentAttributesType): ProductVariation | undefined {
    return variations.find(variation =>
        variation.attributes.every(attr =>
            currentAttributes[attr.slug] === attr.option
        )
    );
}