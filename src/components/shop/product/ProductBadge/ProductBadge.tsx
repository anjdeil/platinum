import { ProductBadgeProps } from "@/types/components/shop";
import { BadgeStyled } from "./styles";
import { useTranslations } from 'next-intl';

const ProductBadge: React.FC<ProductBadgeProps> = ({ type, name }) => {
  const t = useTranslations('Product');
  if (type === 'sale') {
    return <BadgeStyled type={type}>{t('saleTag')}</BadgeStyled>;
  }

  return <BadgeStyled type={type}>{name}</BadgeStyled>;
};

export default ProductBadge;