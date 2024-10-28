import { PagesNavigation } from "@/styles/components";
import { FC, useEffect } from "react";
import { ProductCardList } from "../ProductCardsList";
import { CustomDataProductsType } from "@/types/services";
import { ProductType } from "@/types/pages/shop";
import router, { NextRouter, useRouter } from "next/router";
import { Pagination } from "@mui/material";
import { CustomSingleAccordion } from "@/components/global/accordions/CustomSingleAccordion/CustomSingleAccordion";
import { CustomCheckbox } from "@/components/global/forms/CustomCheckbox";

interface ArchiveProps
{
    products: ProductType[];
    pagesCount: number;
    page: number;
}

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

export const Archive: FC<ArchiveProps> = ({ products, pagesCount, page }) =>
{

    return (
        <>
            <div>
                {/* <PagesNavigation
                    page={+page}
                    count={pagesCount}
                    siblingCount={1}
                    shape="rounded"
                    hidePrevButton
                    hideNextButton
                    onChange={(_, newPage) => { switchPage(newPage, pagesCount); }}
                /> */}
                {/* {products.length && <ProductCardList products={products} />} */}
                <div style={{ maxWidth: '500px', margin: '50px auto' }}>
                    <CustomSingleAccordion title={"test"} children={'sd'} />
                    {/* <CustomCheckbox checked={false} /> */}
                    {/* </CustomSingleAccordion> */}
                </div>
            </div>
        </>
    )
}