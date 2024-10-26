import { PagesNavigation } from "@/styles/components";
import { FC } from "react";
import { ProductCardList } from "../ProductCardsList";
import { ProductType } from "@/types/pages/shop";
import router, { useRouter } from "next/router";
import { Pagination } from "@mui/material";
import CategoryType from "@/types/pages/shop/categories";
import { LangParamType } from "@/types/services";
import { useGetCategoriesQuery } from "@/store/rtk-queries/wpCustomApi";
import CategoriesMenu from "../CategoriesMenu/CategoriesMenu";

interface ArchiveProps {
    products: ProductType[];
    pagesCount: number;
    page: number;
    categories: CategoryType[];
}

const switchPage = (page: number, maxPage: number) => {
    if (maxPage < page) return;
    const { slugs, ...params } = router.query;
    if (!Array.isArray(slugs)) return;

    const newSlugs = slugs.filter(slug => slug !== 'page' && Number.isNaN(+slug));
    if (page !== 1) newSlugs.push('page', String(page));

    router.push({
        pathname: router.pathname,
        query: {
            slugs: newSlugs,
            ...params
        }
    })
}

const switchCategory = (categorySlug: string) => {
    const { slugs, ...params } = router.query;
    if (!Array.isArray(slugs)) return;

    const newSlugs = slugs.filter(slug => slug !== 'category');
    newSlugs.push('category', categorySlug);

    router.push({
        pathname: router.pathname,
        query: {
            slugs: newSlugs,
            ...params
        }
    })
}

export const Archive: FC<ArchiveProps> = ({ products, pagesCount, page, categories }) => {
    const router = useRouter();

    const currentCategory = categories[0];

    return (
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
            <CategoriesMenu onClick={switchCategory} onClose={() => {}} />
            {products.length && <ProductCardList products={products} />}
        </div>
    )
}
