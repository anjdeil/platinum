import { CustomSortAccordion } from "@/components/global/accordions/CustomSortAccordion";
import Breadcrumbs from "@/components/global/Breadcrumbs/Breadcrumbs";
import FilterButton from "@/components/global/buttons/FilterButton/FilterButton";
import { PagesNavigation, Title } from "@/styles/components";
import { ArchivePropsType } from "@/types/components/shop/archive";
import router from "next/router";
import { FC } from "react";
import { FilterPanel } from "../filtration/FilterPanel";
import { ProductCardList } from "../ProductCardsList";
import { CatalogContainer, CatalogFilterBlock, CatalogLayout, CatalogListBlock, CatalogRightWrapper, CatalogTitleWrapper, CatalogTopWrapper, CountProduct, FilterSortWrapper, FIlterWrapper, PagesNavifationWrapper } from "./styles";

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
        <CatalogContainer>
            <CatalogTitleWrapper>
                <Breadcrumbs links={breadcrumbsLinks} />
                <Title as='h1' uppercase>Colored eyelashes</Title>  
            </CatalogTitleWrapper>    
            <CatalogLayout>
                <CatalogFilterBlock>
                    <Title as='h3' uppercase textalign="left" marginBottom="24px">Filters</Title>
                    <FilterPanel
                        attributes={statistic.attributes}
                        maxPrice={statistic.max_price}
                        minPrice={statistic.min_price} />
                </CatalogFilterBlock>
                <CatalogRightWrapper>
                    <CatalogTopWrapper>
                        <FilterSortWrapper>
                            <FIlterWrapper>
                                <FilterButton />
                            </FIlterWrapper>
                            <CustomSortAccordion />
                        </FilterSortWrapper>
                        <CountProduct>
                            {`${products.length}/${statistic.products_count}`}
                        </CountProduct>
                        <PagesNavifationWrapper>
                            <PagesNavigation
                                page={+page}
                                count={pagesCount}
                                siblingCount={1}
                                shape="rounded"
                                hidePrevButton
                                hideNextButton
                                onChange={(_, newPage) => { switchPage(newPage, pagesCount); }}
                            />
                        </PagesNavifationWrapper>
                    </CatalogTopWrapper>
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
                </CatalogRightWrapper>
            </CatalogLayout>
        </CatalogContainer>
    )
}