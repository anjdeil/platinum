import { AddToBasketButtonProps } from '@/types/components/global/buttons/addToBasketButton';
import { NotifyBasketButtonStyled } from './styles';

const NotifyBasketButton: React.FC<AddToBasketButtonProps> = ({
  height,
  children,
}) => {
  return (
    <NotifyBasketButtonStyled height={height}>
      {children}
    </NotifyBasketButtonStyled>
  );
};

export default NotifyBasketButton;
