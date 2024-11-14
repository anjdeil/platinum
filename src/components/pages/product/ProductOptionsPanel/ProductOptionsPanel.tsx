import { ProductOptionsPanelType } from "@/types/pages/product/productOptionsPanel";
import { FC, useCallback, useState } from "react";
import ColorVariations from "../ColorVariations/ColorVariations";
import ProductVariations from "../ProductVariations/ProductVariations";
import { useRouter } from "next/router";


export const ProductOptionsPanel: FC<ProductOptionsPanelType> = ({ attributes }) =>
{
    const [chosenOptions, setChosenOptions] = useState(new Map());
    const router = useRouter();

    function updateChosenOptions(attr: string, option: string)
    {
        const newMap = new Map(chosenOptions);
        newMap.set(attr, option);
        console.log(newMap);
        setChosenOptions(newMap);
        updateUrlParams();
    }

    const updateUrlParams = useCallback(() =>
    {
        const params = Object.fromEntries(
            Array.from(chosenOptions.entries())
                .map(([key, value]) => [key, value])
        );

        router.push({
            pathname: router.pathname,
            query: { ...router.query, ...params }
        });
    }, [chosenOptions])

    return (
        <>
            {attributes.map((attr) =>
            {
                if (attr.slug === 'colour')
                {
                    return (
                        <ColorVariations
                            attr={attr}
                            currentVariation={chosenOptions.get(attr.slug)}
                            onChange={updateChosenOptions}
                        />
                    )
                }

                return (
                    <ProductVariations
                        attr={attr}
                        currentVariation={chosenOptions.get(attr.slug)}
                        onChange={updateChosenOptions}
                    />
                )
            })
            }
        </>
    )
}