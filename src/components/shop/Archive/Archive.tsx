import { PagesNavigation } from "@/styles/components";
import { FC } from "react";
import { ProductCardList } from "../ProductCardsList";

interface ArchiveProps
{
    products: any;
}

/**
 * 
 * Get pag from url
 * If pag bigger than real count of pages
 * If pag smaller than real count of pages
 */

const pagesCount = 5;

function changePagePagination(currentPage, maxPages)
{

}

export const Archive: FC<ArchiveProps> = ({ products, params }) =>
{
    return (
        <div>
            <PagesNavigation
                //  page={+page}
                count={pagesCount}
                siblingCount={-1}
                shape="rounded"
                hidePrevButton
                hideNextButton
                onChange={(_, page) => { console.log(page) }}
            //  onChange={(_, page) => { switchPage(page) }}
            />
            {/* {slugs.length > 0 && <div>{slugs}</div>} */}
            {/* {params && <div>params</div>} */}

            {products && <ProductCardList products={products} />}
        </div>
    )
}