import { ProductCardList } from '@/components/shop/ProductCardsList';
import { useGetProductsQuery } from '@/store/rtk-queries/wpCustomApi';
import { Title } from '@/styles/components';
import { CustomProductListProps } from '@/types/components/shop';
import { ProductType } from '@/types/components/shop/product/products';
import { useTranslations } from 'next-intl';
import { RecommendContainer, StyledText, TitleBlock } from './styles';

const CustomProductList: React.FC<CustomProductListProps> = ({
  title,
  productIds,
  isLoadingProducts,
}) => {
  const t = useTranslations('Product');

  const { data } = useGetProductsQuery({ ids: productIds });

  const products: ProductType[] = data?.data?.items || [];

  return (
    <RecommendContainer>
      <TitleBlock>
        <StyledText>{t('bestForYou')}</StyledText>
        <Title as="h4" uppercase>
          {t(title)}
        </Title>
      </TitleBlock>
      <ProductCardList
        products={products}
        isLoading={isLoadingProducts}
        columns={{
          mobileColumns: 2,
          tabletColumns: 4,
          mintabletColumns: 4,
          desktopColumns: 4,
        }}
      />
    </RecommendContainer>
  );
};

export default CustomProductList;
