import Breadcrumbs from "@/components/global/Breadcrumbs/Breadcrumbs";
import { Container, PagesNavigation, Title } from "@/styles/components";
import { ArchivePropsType } from "@/types/components/shop/archive";
import router from "next/router";
import { FC } from "react";
import { FilterPanel } from "../filtration/FilterPanel";
import { ProductCardList } from "../ProductCardsList";
import { CatalogFilterBlock, CatalogLayout, CatalogListBlock } from "./styles";

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

    const breadcrumbsLinks = [
    {
        name: 'ALL SHOP',
        url: '/',
    },
    {
        name: 'EYELASH EXTENSIONS',
        url: '/',
    },
    {
        name: ' NEW System UV',
        url: '/',
    },
    ];

    return (
        <Container>
            <Breadcrumbs links={breadcrumbsLinks} />
            <Title as='h1' uppercase>Colored eyelashes</Title>
            <PagesNavigation
                page={+page}
                count={pagesCount}
                siblingCount={1}
                shape="rounded"
                hidePrevButton
                hideNextButton
                onChange={(_, newPage) => { switchPage(newPage, pagesCount); }}
            />
            <CatalogLayout>
                <CatalogFilterBlock>
                    <Title as='h3' uppercase textalign="left" marginBottom="24px">Filters</Title>
                    <FilterPanel
                        attributes={statistic.attributes}
                        maxPrice={statistic.max_price}
                        minPrice={statistic.min_price} />
                </CatalogFilterBlock>
                <CatalogListBlock>
                    {products.length && <ProductCardList products={products}
                        columns={
                            {
                                mobileColumns: 2,
                                tabletColumns: 4,
                                desktopColumns: 3
                            }
                        }
                        />}
                </CatalogListBlock>
            </CatalogLayout>
        </Container>
    )
}