import { ProductAttributesType, ProductVariation } from "@/types/components/shop/product/products";

export function filterFirstAttributeOptions(
    attributes: ProductAttributesType[],
    variations: ProductVariation[]
) {
    if (!attributes.length) return attributes;

    const firstAttribute = attributes[0];
    const otherAttributeSlugs = attributes.slice(1).map(attr => attr.slug);

    const validOptions = new Set<string>();

    for (const variation of variations) {
        const hasAllSlugs = otherAttributeSlugs.every(slug =>
            variation.attributes.some(attr => attr.slug === slug)
        );
        if (!hasAllSlugs) continue;

        const firstAttr = variation.attributes.find(
            attr => attr.slug === firstAttribute.slug
        );
        if (firstAttr) validOptions.add(firstAttr.option);
    }

    const filteredFirstAttribute = {
        ...firstAttribute,
        options: firstAttribute.options.filter(opt => validOptions.has(opt.slug)),
    };

    return [filteredFirstAttribute, ...attributes.slice(1)];
}