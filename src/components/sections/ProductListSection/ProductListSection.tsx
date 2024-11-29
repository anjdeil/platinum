import { ProductListSectionData } from '@/types/components/sections';
import { StyledContainer } from './styles';
import { useGetProductsQuery } from '@/store/rtk-queries/wpCustomApi';
import { ProductType } from '@/types/pages/shop';
import { RecommendContainer } from '@/components/pages/product/CustomProductList/styles';
import { StyledText } from '@/components/global/TitleBlock/styles';
import { Title } from '@/styles/components';
import { ProductCardList } from '@/components/shop/ProductCardsList';
import { TitleBlock } from '../styles';

type ProductListSectionProps = Omit<ProductListSectionData, '_type'>;

export const ProductListSection: React.FC<ProductListSectionProps> = ({
  subtitle,
  title,
  sort_type,
}) => {
  const PER_PAGE = 4;
  const NEWEST_PARAMS = {
    per_page: PER_PAGE,
    order_by: 'created',
    order: 'desc' as const,
  };
  const POPULAR_PARAMS = {
    per_page: PER_PAGE,
    order_by: 'stock_quantity',
    order: 'desc' as const,
  };

  const {
    data: newestData,
    error: newestError,
    isLoading: isNewestLoading,
  } = useGetProductsQuery(NEWEST_PARAMS);

  const {
    data: popularData,
    error: popularError,
    isLoading: isPopularLoading,
  } = useGetProductsQuery(POPULAR_PARAMS);

  const newestProducts: ProductType[] = newestData?.data?.items || [];
  const popularProducts: ProductType[] = popularData?.data?.items || [];
  
  return (
    <StyledContainer>
      <RecommendContainer>
        <TitleBlock>
          <StyledText>{subtitle}</StyledText>
          <Title as='h4' uppercase>
            {title}
          </Title>
        </TitleBlock>
        {sort_type === 'newest' && (
          <ProductCardList
            products={newestProducts}
            isLoading={isNewestLoading}
            isError={!!newestError}
          />
        )}
        {sort_type === 'popular' && (
          <ProductCardList
            products={popularProducts}
            isLoading={isPopularLoading}
            isError={!!popularError}
          />
        )}
      </RecommendContainer>
    </StyledContainer>
  );
};
