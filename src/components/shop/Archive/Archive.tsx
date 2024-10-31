import { PagesNavigation } from "@/styles/components";
import { FC, useEffect } from "react";
import { ProductCardList } from "../ProductCardsList";
import { CustomDataProductsStatisticType, CustomDataProductsType } from "@/types/services";
import { ProductType } from "@/types/pages/shop";
import router, { NextRouter, useRouter } from "next/router";
import { Pagination } from "@mui/material";
import { CustomSingleAccordion } from "@/components/global/accordions/CustomSingleAccordion/CustomSingleAccordion";
import { CustomCheckbox } from "@/components/global/forms/CustomCheckbox";
import { PriceFilter } from "../filtration/PriceFilter/PriceFilter";
import { FilterPanel } from "../filtration/FilterPanel";
import { ArchivePropsType } from "@/types/components/shop/archive";

const switchPage = (page: number, maxPage: number) =>
{
    if (maxPage < page) return;
    const { slugs, ...params } = router.query;
    if (!Array.isArray(slugs)) return;

    const newSlugs = slugs.filter(slug => slug !== 'page' && Number.isNaN(+slug));
    newSlugs.push('page', String(page));

    router.push({
        pathname: router.pathname,
        query: {
            slugs: newSlugs,
            ...params
        }
    })
}

export const Archive: FC<ArchivePropsType> = (props) =>
{
    const { products, pagesCount, page, statistic } = props;

    return (
        <>
            <div>
                <PagesNavigation
                    page={+page}
                    count={pagesCount}
                    siblingCount={1}
                    shape="rounded"
                    hidePrevButton
                    hideNextButton
                    onChange={(_, newPage) => { switchPage(newPage, pagesCount); }}
                />
                <div style={{ display: 'flex', gap: '100px' }}>
                    <div style={{ width: '1000px', margin: '50px auto' }}>
                        <FilterPanel
                            attributes={statistic.attributes}
                            maxPrice={statistic.max_price}
                            minPrice={statistic.min_price} />
                    </div>
                    {products.length && <ProductCardList products={products} />}
                </div>
            </div >
        </>
    )
}