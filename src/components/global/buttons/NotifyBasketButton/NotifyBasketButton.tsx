import { AddToBasketButtonProps } from '@/types/components/global/buttons/addToBasketButton';
import { NotifyBasketButtonStyled } from './styles';

const NotifyBasketButton: React.FC<AddToBasketButtonProps> = ({
  height,
  onClick,
  children,
}) => {
  return (
    <NotifyBasketButtonStyled height={height} onClick={onClick}>
      {children}
    </NotifyBasketButtonStyled>
  );
};

export default NotifyBasketButton;
