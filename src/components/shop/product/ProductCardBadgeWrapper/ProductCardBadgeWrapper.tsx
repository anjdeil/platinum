import { ReactNode } from 'react';
import { BadgeCardWrapper } from './styles';

interface ProductCardBadgeWrapperProps {
  children: ReactNode;
}
const ProductCardBadgeWrapper: React.FC<ProductCardBadgeWrapperProps> = ({
  children,
}) => {
  return <BadgeCardWrapper>{children}</BadgeCardWrapper>;
};

export default ProductCardBadgeWrapper;
