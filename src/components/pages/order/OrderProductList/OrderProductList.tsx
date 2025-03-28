import { lineOrderItems } from '@/types/store/reducers/сartSlice';
import { DEFAULT_IMAGE } from '@/utils/consts';
import { formatPrice } from '@/utils/price/formatPrice';
import { useTranslations } from 'next-intl';
import {
  BlockInfo,
  HeaderItem,
  HeaderItemName,
  InfoTitle,
  ListBody,
  ListHeader,
  ListItem,
  ProductImage,
  ProductListWrapper,
  StyledValue,
  WrapperBlock,
  WrapperBlockInfo,
  WrapperHeader,
} from './styles';

interface OrderProductListProps {
  lineItems: lineOrderItems[];
  currency: string | undefined;
}

const OrderProductList: React.FC<OrderProductListProps> = ({
  lineItems,
  currency,
}) => {
  const t = useTranslations('MyAccount');

  return (
    <ProductListWrapper>
      <ListHeader>
        <HeaderItemName>{t('productName')}</HeaderItemName>
        <WrapperHeader>
          <HeaderItem>{t('price')}</HeaderItem>
          <HeaderItem>{t('quantity')}</HeaderItem>
          <HeaderItem>{t('total')}</HeaderItem>
        </WrapperHeader>
      </ListHeader>
      <ListBody>
        {lineItems.map(product => (
          <ListItem key={product.product_id}>
            <WrapperBlock>
              <ProductImage
                width={60}
                height={60}
                src={product.image?.src || DEFAULT_IMAGE}
                alt="product image"
              />
              <StyledValue>{product.name}</StyledValue>
            </WrapperBlock>
            <WrapperBlockInfo>
              <BlockInfo>
                <InfoTitle>{t('price')}</InfoTitle>
                <StyledValue>
                  {formatPrice(product.price)}&nbsp;{currency}
                </StyledValue>
              </BlockInfo>
              <BlockInfo>
                <InfoTitle>{t('quantity')}</InfoTitle>
                <StyledValue>{product.quantity}</StyledValue>
              </BlockInfo>
              <BlockInfo>
                <InfoTitle>{t('total')}</InfoTitle>
                <StyledValue>
                  {formatPrice(+product.total)}&nbsp;{currency}
                </StyledValue>
              </BlockInfo>
            </WrapperBlockInfo>
          </ListItem>
        ))}
      </ListBody>
    </ProductListWrapper>
  );
};

export default OrderProductList;
