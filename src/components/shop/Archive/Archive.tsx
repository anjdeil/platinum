import { Container, FlexBox, PagesNavigation, Title } from "@/styles/components";
import { FC, useState } from "react";
import { ProductCardList } from "../ProductCardsList";
import { ProductType } from "@/types/pages/shop";
import router, { useRouter } from "next/router";
import CategoryType from "@/types/pages/shop/categories";
import CategoriesMenu from "../CategoriesMenu/CategoriesMenu";
import { FilterNCategoriesHead, FilterNCategoriesMenu, FilterOverlay, GridBox, SortPanel } from "./styles";
import FilterIconButton from "@/components/global/buttons/FilterIconButton/FilterIconButton";
import theme from "@/styles/theme";
import MobileCategoriesMenu from "@/components/global/popups/MobileCategoriesMenu/MobileCategoriesMenu";
import { useDispatch } from "react-redux";
import { popupClosed } from "@/store/slices/PopupSlice";
import { useResponsive } from "@/hooks/useResponsive";
import CloseIcon from "@/components/global/icons/CloseIcon/CloseIcon";

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

export const switchCategory = (parentSlug: string, childSlug?: string) => {
    const { slugs, ...params } = router.query;
    const newSlugs = childSlug ? [parentSlug, childSlug] : [parentSlug];

    router.push({
        pathname: router.pathname,
        query: {
            slugs: newSlugs,
            ...params
        }
    });
}

export const Archive: FC<ArchiveProps> = ({ products, pagesCount, page, categories }) => {
    const [isMenuVisible, setMenuVisible] = useState(false);

    const toggleMenu = () => {
        setMenuVisible(!isMenuVisible);
    };

    return (
        <Container>
            <Title as="h2" fontWeight={600} fontSize="24px" uppercase={true} marginBottom='24px'>
                {categories[0].name}
            </Title>
            <GridBox>
                <FilterNCategoriesMenu visible={isMenuVisible}>
                    {isMenuVisible ?
                        <>  
                        <FilterNCategoriesHead>
                        <h4>FILTER</h4>
                        <CloseIcon onClick={toggleMenu} />
                        </FilterNCategoriesHead>
                        <MobileCategoriesMenu padding="right" disableOverlay={true} width="300px" onClose={toggleMenu} switchCategory={switchCategory} />
                        </>
                        :
                        <CategoriesMenu switchCategory={switchCategory} selectedCategories={categories} />
                    }
                    <h3>FILTERS</h3>
                </FilterNCategoriesMenu>
                <FilterOverlay visible={isMenuVisible} onClick={toggleMenu} />
                <div>
                    <SortPanel>
                        <FlexBox>
                            <FilterIconButton onClick={toggleMenu} width="48px" height="48px" padding='12px' backgroundColor={theme.colors.primary} />
                            <span>sort</span>
                        </FlexBox>
                        <span>12</span>
                        <PagesNavigation
                            page={+page}
                            count={pagesCount}
                            siblingCount={1}
                            shape="rounded"
                            hidePrevButton
                            hideNextButton
                            onChange={(_, newPage) => { switchPage(newPage, pagesCount); }}
                        />

                    </SortPanel>
                    {products.length && <ProductCardList products={products} />}
                </div>
            </GridBox>



        </Container>
    )
}

